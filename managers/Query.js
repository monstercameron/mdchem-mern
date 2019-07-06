const db = require('../managers/Database')
const Student = require('../models/schemas/student')
class findByEmail {
    constructor(body, callback) {
        this.find(body.email, callback)
    }
    find = (email, callback) => {
        const student = db.model('student', Student, 'test');
        student.findOne({ email: email }, (err, docs) => {
            //console.log(docs)
            callback(docs)
        })
    }
}
module.exports = {
    findByEmail: findByEmail
}