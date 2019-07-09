const db = require('./Database')
const studentSch = require('../models/schemas/student')
const { findByEmail } = require('../managers/Query')
const { Hash, Compare } = require('../managers/Encrypt')

class AddStudent {
    _student
    constructor(res, body) {
        this.buildStudent(res, body)
    }
    buildStudent = (res, body) => {
        new Hash(body.password, (hash) => {
            console.log(hash)
            const student = db.model('student', studentSch, 'test');
            this._student = new student({
                email: body.email,
                hash: hash,
                class: body.class
            })
            console.log(this._student)
            this.saveStudent(res)
        })
    }
    validateStudent = () => {

    }
    saveStudent = (res) => {
        this._student.save((err, model) => {
            if (err) throw err
            console.log(model)
            res.send(`res`)
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