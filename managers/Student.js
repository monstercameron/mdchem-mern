/**
 * Student Auth Manager
 */
const db = require('./Database')
const studentSch = require('../models/schemas/student')
const { findByEmail, studentEmailExist } = require('../managers/Query')
const { Hash, Compare } = require('../managers/Encrypt')
const { createToken, verifyToken } = require('../managers/Authentication')
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
            const student = db.model('student', studentSch, 'students');
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
        const student = db.model('student', studentSch, 'students');
        student.count({}, (err, count) => {
            if(err)  throw err
            this.res.json({count:count})
        })
    }
}
module.exports = {
    addStudent: AddStudent,
    compareStudent: CompareStudent,
    deleteStudent: DeleteStudent,
    authenticateStudent: AuthenticateStudent,
    countStudent:CountStudent
}