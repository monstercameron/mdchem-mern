/**
 * Student Manager
 */
const {
    db
} = require('./Database')
const Student = require('../models/schemas/student')
const Stat = require('../models/schemas/stats')
const {
    Hash,
    Compare
} = require('../managers/Encrypt')
const {
    createToken
} = require('../managers/Authentication')
/**
 * Add new Student to the database
 */
class AddStudent {
    constructor(req, res) {
        this.body = this.bodyShim(req.body)
        this.res = res
        this.run()
    }
    bodyShim = (body) => {
        return {
            email: body.email.toLowerCase(),
            role: 'student',
            password: body.password.toLowerCase(),
            recovery: {
                question: body.question.toLowerCase(),
                answer: body.answer.toLowerCase()
            },
            meta: {
                group: body.group.toLowerCase()
            }
        }
    }
    run = () => {
        this.validateStudent()
    }
    validateStudent = () => {
        // only email validation done  so far, other  validation TBC
        new StudentEmailExists(this.body.email, (results) => {
            if (results) return this.res.status(200).json({
                results: {
                    message: `${this.body.email} already exists`
                }
            })
            this.primaryhash()
        })
    }
    primaryhash = () => {
        new Hash(this.body.password, (hash) => {
            const student = db.model('student', Student);
            this._student = new student({
                email: this.body.email,
                role: this.body.role,
                hash: hash,
                recovery: {
                    question: this.body.recovery.question
                },
                meta: {
                    group: this.body.meta.group
                }
            })
            //console.log(this._student)
            this.recoveryHash()
        })
    }
    recoveryHash = () => {
        const {
            question,
            answer
        } = this.body.recovery
        //console.log(this.body)
        new Hash(question + answer, (hash) => {
            this._student.recovery.hash = hash
            // console.log(this._student)
            this.saveStudent()
        })
    }
    saveStudent = () => {
        this._student.save((err, model) => {
            // console.log(model)
            if (err) throw err
            this.res.json({
                results: {
                    message: `Student ${model.email} saved`
                }
            })
        })
    }
}
/**
 * @name - Delete Student
 * @description - Delete a Student from the database
 */
const deleteStudent = async (req, res) => {
    try {
        const student = await findStudentByEmailOrIdPromise(
            req.body.email ? {
                email: req.body.email
            } : {
                id: req.body.id
            })
        // console.log(student)
        const results = await student.remove()
        res.json({
            results: {
                message: `Student ${student.email} deleted!`
            }
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
/**
 * Update a Student from the database
 */
class UpdateStudent {
    constructor(req, res) {
        this.res = res
        this.req = req
        this.body = this.dataBuilder(req.body)
        this.run()
    }
    run = () => {
        this.update()
    }
    dataBuilder = (body) => {
        const {
            levelID
        } = body
        return {
            [levelID]: {
                score: body.score,
                correct: body.correctData,
                incorrect: body.incorrectData
            }
        }
    }
    update = () => {
        new FindStudentById(this.req, this.res, (result) => {
            const updatedData = this.body
            let {
                data
            } = result
            let newData
            if (!data) newData = updatedData
            else newData = Object.assign(data, updatedData)
            result.updateOne({
                data: newData
            }, (err, result) => {
                this.res.json({
                    results: {
                        message: 'model updated',
                        updated: result
                    }
                })
            })
        })
    }
}
/**
 * Login by generating a token
 */
class AuthenticateStudent {
    constructor(req, res) {
        this.res = res
        this.body = req.body
        this.run()
    }
    run = () => {
        this.validation()
    }
    validation = () => {
        this.emailExists()
    }
    emailExists = () => {
        new StudentEmailExists(this.body.email, (result) => {
            if (!result) return this.res.status(400).json({
                results: {
                    message: `user ${this.body.email} doesn't exist`
                }
            })
            //console.log(result)
            console.log(result._id)
            this._student = result
            this.checkPassword()
        })
    }
    checkPassword = () => {
        const {
            password
        } = this.body
        const {
            hash
        } = this._student
        new Compare(password, hash, (result) => {
            //console.log(`result:`, result)
            if (result) {
                this.generateToken()
            } else {
                this.res.status(403).json({
                    results: {
                        message: `Credentials did not match.`
                    }
                })
            }
        })
    }
    generateToken = () => {
        const params = {
            payload: {
                role: `student`,
                id: this._student._id
            },
            options: {
                expiresIn: 1000 * 60 * 60 * 24 * 7 /* 1  week */
                // expiresIn: 1000 * 30 /* 30 seconds */
            }
        }
        createToken(params)
            .then(token => this.res.status(200)
                .cookie('token', token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7 /* 1  week */ ,
                    // maxAge: 1000 * 30 /* 30 seconds */ ,
                    httpOnly: true
                })
                .cookie('id', this._student._id)
                .json({
                    results: {
                        message: `Successfully Authenticated.`
                    }
                }))
            .catch(err => this.res.status(500).json({
                results: {
                    error: err,
                    message: `There was an error.`
                }
            }))
    }
}
/**
 * Count  Students
 */
const CountStudent = async (req, res) => {
    try {
        const student = db.model('student', Student);
        const count = await student.countDocuments()
        res.json({
            results: {
                count: count
            }
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
}
/**
 * Return a list of all students (ids, emails)
 */
class FindAllStudents {
    constructor(req, res) {
        this.req = req
        this.res = res
        this.run()
    }
    run = () => {
        this.find()
    }
    find = () => {
        const {
            filter
        } = this.req
        const student = db.model('student', Student)
        const where = this.req.query.group ? {
            'meta.group': this.req.query.group
        } : {}

        student.find(where, (err, docs) => {
            if (err) this.res.status(400).json({
                results: {
                    students: docs
                }
            })
            this.res.status(200).json({
                results: {
                    students: docs
                }
            })
        }).select(filter)
    }
}
/**
 * Check if the student already exists via email
 */
class StudentEmailExists {
    constructor(email, callback) {
        this.email = email
        this.callback = callback
        this.run()
    }
    run = () => {
        this.query()
    }
    query = () => {
        const student = db.model('student', Student)
        student.findOne({
            email: this.email
        }, (err, docs) => {
            this.callback(docs)
        })
    }
}
/**
 * Query student via unique key / id
 */
class FindStudentById {
    constructor(req, res, callback) {
        this.id = req.cookies.id ? req.cookies.id : req.params.id
        this.res = res
        this.callback = callback
        this.run()
    }
    run = () => {
        this.find()
    }
    find = () => {
        const student = db.model('student', Student)
        student.findById(this.id, (err, docs) => {
            if (typeof this.callback === 'function') this.callback(docs)
            else this.res.status(200).json({
                results: {
                    student: docs
                }
            })
        }).select('-hash -recovery')
    }
}
/**
 * Query student via email address
 */
class FindStudentByEmail {
    constructor(body, callback) {
        this.find(body.email, callback)
    }
    find = (email, callback) => {
        const student = db.model('student', Student)
        student.findOne({
            email: email
        }, (err, docs) => {
            //console.log(docs)
            callback(docs)
        }).select('-hash -recovery')
    }
}
const findStudentByEmailOrIdPromise = async ({
    email,
    id
}) => {
    const student = db.model('student', Student)
    const aStudent = await student.findOne(email ? {
            email: email
        } : {
            _id: id
        })
        .select('-hash -recovery')
    return new Promise((resolve, reject) => {
        aStudent ? resolve(aStudent) : reject(new Error('Student Not Found'))
    })
}
/**
 * Returns a list of all students and their data
 */
class AllData {
    constructor(callback) {
        this.find(callback)
    }
    find = (callback) => {
        const student = db.model('student', Student)
        student.find({}, (err, docs) => {
            //console.log(docs)
            callback(docs)
        })
    }
}
/**
 * returns sorted list of highscore
 */
const highscore = async (req, res) => {
    try {
        const student = db.model('student', Student)
        const query = await student.find({})
            .select('score')
            .select('email')
            .sort({
                score: -1
            })
            .limit(10)
        let scores = []
        for (const highscore of query) {
            scores.push({
                score: highscore.score,
                user: highscore.email
            })
        }
        res.json({
            scores
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: error
        })
    }
}
/**
 * Reset Student Password
 */
class ResetStudentPassword {
    constructor(req, res) {
        this.body = req.body
        this.res = res
        this.run()
        //res.json(this.body)
    }
    run = () => {
        this.emailExists()
    }
    emailExists = () => {
        new StudentEmailExists(this.body.email, (result) => {
            if (!result) this.res.status(400).json({
                results: {
                    message: `user ${this.body.email} doesn't exist`
                }
            })
            //console.log(result)
            this._student = result
            this.checkSecretQuestion()
        })
    }
    checkSecretQuestion = () => {
        const {
            question,
            answer
        } = this.body
        const {
            hash
        } = this._student.recovery
        //console.log(question+answer)
        new Compare(question + answer, hash, (result) => {
            //console.log(`result:`, result)
            if (result) {
                this.generateNewHash()
            } else {
                this.res.status(401).json({
                    results: {
                        message: `Credentials did not match.`
                    }
                })
            }
        })
    }
    generateNewHash = () => {
        new Hash(this.body.password, (hash) => {
            this._student.hash = hash
            //console.log(this._student)
            this.updatePassword()
        })
    }
    updatePassword = () => {
        this._student.save((err, model) => {
            if (err) throw this.res.status(500).json({
                results: {
                    error: err
                }
            })
            // console.log(model)
            this.res.status(200).json({
                results: {
                    message: `Student ${model.email} password updated!`
                }
            })
        })
    }
}

/**
 * @name Admin Groups
 * @description queries database and return a list of groups for specified admin
 */
const countStudentsPerClass = async (req, res) => {
    try {
        const student = db.model('student', Student)
        const query = await student.countDocuments({
            meta: {
                group: req.params.group
            }
        })
        // console.log(query)
        res.json({
            results: {
                count: query
            }
        })
    } catch (error) {
        res.json({
            results: {
                error: error.message
            }
        })
    }
}
const averageScore = async (req, res) => {
    try {
        const stat = db.model('stats', Stat)
        const query = await stat.findOne({})
        //console.log(query)
        res.json({
            results: {
                average: query.average
            }
        })
    } catch (e) {
        res.json({
            error: e
        })
    }
}
const changeGroup = async (req, res) => {
    try {
        const student = db.model('student', Student)
        const query = await student.findById(req.body.id)
        query.meta.group = req.body.group
        query.save()
        // console.log(query)
        res.json({
            results: {
                message: `Student ${query.email}'s group was updated  successfully`
            }
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json({
            error: error
        })
    }
}
module.exports = {
    addStudent: AddStudent,
    deleteStudent,
    authenticateStudent: AuthenticateStudent,
    countStudent: CountStudent,
    findAllStudents: FindAllStudents,
    findStudentByEmailOrIdPromise,
    emailExistsStudent: StudentEmailExists,
    findStudentById: FindStudentById,
    findStudentByEmail: FindStudentByEmail,
    allStudentData: AllData,
    highscore,
    updateStudent: UpdateStudent,
    resetStudentPassword: ResetStudentPassword,
    countStudentsPerClass,
    averageScore,
    changeGroup
}