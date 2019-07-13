/**
 * Query Classes, handle querying the database
 */
const db = require('../managers/Database')
const Student = require('../models/schemas/student')
const Admin = require('../models/schemas/admin')
/**
* Query student via email address
*/
class FindByEmail {
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
* Query student via unique key / id
*/
class FindById {
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
 * returns sorted list of highscore
 */
class Highscore {
    constructor(callback){
        this.getHighscore(callback)
    }
    getHighscore = (callback) => {
        const student = db.model('student', Student, 'test')
        student.find({}, (err, students) => {
            //console.log(docs)
            callback(students)
        })
        .select('score')
        .select('email')
        .sort({score:-1})
        .limit(10)
    }
}
/**
 * Return a list of all students (ids, emails)
 */
class FindAll {
    constructor(filter, callback) {
        this.find(filter, callback)
    }
    find = (filter, callback) => {
        const student = db.model('student', Student, 'test')
        student.find({}, (err, docs) => {
            //console.log(docs)
            callback(docs)
        })
        .select(filter)
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
 * Check if the student already exists via email
 */
class StudentEmailExists {
    constructor(email, callback){
        this.email = email
        this.callback = callback
        this.run()
    }
    run = () => {
        this.query()
    }
    query = () => {
        const student = db.model('student', Student, 'students')
        student.findOne({email:this.email}, (err, docs) => {
            //console.log('email exists results:',docs)
            this.callback(docs)
        })
    }
}
/**
 * Check if Admin already exists via email
 */
class AdminEmailExists {
    constructor(email, callback){
        this.email = email
        this.callback = callback
        this.run()
    }
    run = () => {
        this.query()
    }
    query = () => {
        const admin = db.model('admin', Admin, 'admin')
        admin.findOne({email:this.email}, (err, docs) => {
            //console.log('email exists results:',docs)
            this.callback(docs)
        })
    }
}
module.exports = {
    findByEmail: FindByEmail,
    findById: FindById,
    findAll: FindAll,
    allData: AllData,
    highscore: Highscore,
    studentEmailExist: StudentEmailExists,
    adminEmailExist: AdminEmailExists
}