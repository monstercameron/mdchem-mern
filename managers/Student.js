/**
 * Student Auth Manager
 */
const db = require('./Database')
const studentSch = require('../models/schemas/student')
const { findByEmail, studentEmailExist } = require('../managers/Query')
const { Hash, Compare } = require('../managers/Encrypt')
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
            results!==undefined
            ?this.res.status(400).json({message:`${this.body.email} already registered`})
            :this.primaryhash()
        })
    }
    primaryhash = () => {
        new Hash(this.body.password, (hash) => {
            const student = db.model('student', studentSch, 'students');
            this._student = new student({
                email: this.body.email,
                role: this.body.role,
                hash: hash,
                recovery:{
                    question:this.body.recovery.question
                },
                meta:{
                     group: this.body.meta.group
                }
            })
            //console.log(this._student)
            this.recoveryHash()
        })
    }

    recoveryHash = () => {
        const { question, recovery_password} = this.body.recovery
        new Hash(question+recovery_password, (hash) => {
            this._student.recovery.hash = hash
            // console.log(this._student)
            this.saveStudent()
        })
    }

    saveStudent = () => {
        this._student.save((err, model) => {
            if (err) throw this.res.status(500).json(err)
            // console.log(model)
            this.res.status(200).json({message:`Student ${model.email} saved`})
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
    constructor(res, body){
        this.delete(res, body.email)
    }
    delete = (res, email) => {
        new findByEmail(email, (result) => {
            res.json({student:result})
        })
    }
}
module.exports = {
    addStudent: AddStudent,
    compareStudent: CompareStudent,
    deleteStudent: DeleteStudent,
}