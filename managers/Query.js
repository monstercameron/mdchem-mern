/**
 * Query Classes, handle querying the database
 */
const db = require('../managers/Database')
const Admin = require('../models/schemas/admin')

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
    adminEmailExist: AdminEmailExists
}