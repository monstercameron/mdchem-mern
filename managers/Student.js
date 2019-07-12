const db = require('./Database')
const studentSch = require('../models/schemas/student')
const { findByEmail } = require('../managers/Query')
const { Hash, Compare } = require('../managers/Encrypt')

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
        this.primaryhash()
    }
    primaryhash = () => {
        new Hash(this.body.password, (hash) => {
            const student = db.model('student', studentSch, 'test');
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
            console.log(this._student)
            //this.saveStudent()
            this.res.send('done')
        })
    }

    saveStudent = () => {
        this._student.save((err, model) => {
            if (err) throw this.res.status(500).json(err)
            console.log(model)
            this.res.status(200).json({message:`Student ${model.email} saved`})
        })
    }

}

class CompareStudent {
    constructor(res, password, hash, callback) {
        new Compare(res, password, hash, callback)
    }
}

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