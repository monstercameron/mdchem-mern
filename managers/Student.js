/**
 * Student Manager
 */
const db = require('./Database')
const Student = require('../models/schemas/student')
const { findByEmail, studentEmailExist } = require('../managers/Query')
const { Hash, Compare } = require('../managers/Encrypt')
const { createToken } = require('../managers/Authentication')
/**
 * Add new Student to the database
 */
class AddStudent {
    _student
    constructor(res, body) {
        this.res = res
        this.body = body
        this.run()
    }
    run = () => {
        this.validateStudent()
    }
    validateStudent = () => {
        // Note no validation has been done TBD
        new studentEmailExist(this.body.email, (results) => {
            results !== undefined
                ? this.res.status(400).json({ message: `${this.body.email} already registered` })
                : this.primaryhash()
        })
    }
    primaryhash = () => {
        new Hash(this.body.password, (hash) => {
            const student = db.model('student', Student, 'students');
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
        const { question, recovery_password } = this.body.recovery
        new Hash(question + recovery_password, (hash) => {
            this._student.recovery.hash = hash
            // console.log(this._student)
            this.saveStudent()
        })
    }

    saveStudent = () => {
        this._student.save((err, model) => {
            if (err) throw this.res.status(500).json(err)
            // console.log(model)
            this.res.status(200).json({ message: `Student ${model.email} saved` })
        })
    }

}
/**
 * Compare Student credentials for Login
 */
class CompareStudent {
    constructor(res, password, hash, callback) {
        new Compare(res, password, hash, callback)
    }
}
/**
 * Delete a Student from the database
 */
class DeleteStudent {
    constructor(res, body) {
        this.delete(res, body.email)
    }
    delete = (res, email) => {
        new findByEmail(email, (result) => {
            res.json({ student: result })
        })
    }
}
/**
 * Login by generating a token
 */
class AuthenticateStudent {
    constructor(res, body) {
        this.res = res
        this.body = body
        this.run()
    }
    run = () => {
        this.validation()
    }
    validation = () => {
        this.emailExists()
    }
    emailExists = () => {
        new studentEmailExist(this.body.email, (result) => {
            if (!result) this.res.status(400).json({ message: `user ${this.body.email} doesn't exist` })
            //console.log(result)
            this._student = result
            this.checkPassword()
        })
    }
    checkPassword = () => {
        const { password } = this.body
        const { hash } = this._student
        new Compare(password, hash, (result) => {
            //console.log(`result:`, result)
            if (result) {
                this.generateToken()
            } else {
                this.res.status(403).json({ message: `Credentials did not match.` })
            }
        })
    }
    generateToken = () => {
        const params = {
            payload: { role: `student` },
            options: {
                expiresIn: 60 * 15 // 15 minutes
            }
        }
        createToken(params)
            .then(token => this.res.status(200).json({ token: token, message: `Successfully Authenticated.` }))
            .catch(err => this.res.status(500).json({ error: err, message: `There was an error.` }))
    }
}
/**
 * Count  Students
 */
class CountStudent {
    constructor(req, res) {
        this.req = req
        this.res = res
        this.run()
    }
    run = () => {
        this.count()
    }
    count = () => {
        const student = db.model('student', Student, 'students');
        student.countDocuments({}, (err, count) => {
            if (err) throw err
            this.res.json({ results: count })
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
        const { filter } = this.req
        const student = db.model('student', Student, 'test')
        student.find({}, (err, docs) => {
            if(err) throw err
            this.res.status(200).json({results:docs})
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
        const student = db.model('student', Student, 'students')
        student.findOne({ email: this.email }, (err, docs) => {
            //console.log('email exists results:',docs)
            this.callback(docs)
        })
    }
}
/**
* Query student via unique key / id
*/
class FindStudentById {
    constructor(id, callback) {
        this.id = id
        this.callback = callback
        this.run()
    }
    run = () => {
        this.find()
    }
    find = () => {
        const student = db.model('student', Student, 'test')
        student.findById(this.id, (err, docs) => {
            //console.log(docs)
            console.log(`+++ item found`)
            this.callback(docs)
        })
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
        const student = db.model('student', Student, 'test')
        student.findOne({
            email: email
        }, (err, docs) => {
            //console.log(docs)
            callback(docs)
        })
    }
}
/**
 * Returns a list of all students and their data
 */
class AllData {
    constructor(callback) {
        this.find(callback)
    }
    find = (callback) => {
        const student = db.model('student', Student, 'test')
        student.find({}, (err, docs) => {
            //console.log(docs)
            callback(docs)
        })
    }
}
/**
 * returns sorted list of highscore
 */
class Highscore {
    constructor(req,  res){
        this.req = req
        this.res = res
        this.run()
    }
    run= () => {
        this.getHighscore()
    }
    getHighscore = () => {
        const student = db.model('student', Student, 'test')
        student.find({}, (err, highscores) => {
            if(err) throw err
            //console.log(docs)
            this.res.json({results:highscores})
        })
        .select('score')
        .select('email')
        .sort({score:-1})
        .limit(10)
    }
}
module.exports = {
    addStudent: AddStudent,
    compareStudent: CompareStudent,
    deleteStudent: DeleteStudent,
    authenticateStudent: AuthenticateStudent,
    countStudent: CountStudent,
    findAllStudents: FindAllStudents,
    emailExistsStudent: StudentEmailExists,
    findStudentById: FindStudentById,
    findStudentByEmail: FindStudentByEmail,
    AllStudentData: AllData,
    highscore:Highscore
}