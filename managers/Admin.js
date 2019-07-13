const db = require('../managers/Database')
const adminSch = require('../models/schemas/admin')
const { Hash } = require('../managers/Encrypt')
const { adminEmailExist } = require('../managers/Query')
const AddAdmin = class {
    constructor(res, body) {
        this.res = res
        this.body = body
        this.run()
    }
    run = () => {
        this.validateAdmin()
    }
    validateAdmin = () => {
        // Validation TBC
        new adminEmailExistrs
        (this.body.email, (results) => {
            results!==undefined
            ?this.res.status(400).json({message:`${this.body.email} already registered`})
            :this.primaryhash()
        })
    }
    primaryhash = () => {
        new Hash(this.body.password, (hash) => {
            const admin = db.model('admin', adminSch, 'admin');
            this._admin = new admin({
                name: this.body.name,
                email: this.body.email,
                role: this.body.role,
                hash: hash,
                recovery: {
                    question: this.body.recovery.question
                }
            })
            //console.log(this._admin)
            this.recoveryHash()
        })
    }
    recoveryHash = () => {
        const { question, recovery_password } = this.body.recovery
        new Hash(question + recovery_password, (hash) => {
            this._admin.recovery.hash = hash
            //console.log(this._admin)
            this.saveAdmin()
            //this.res.send('works')
        })
    }
    saveAdmin = () => {
        this._admin.save((err, model) => {
            if (err) throw this.res.status(500).json(err)
            // console.log(model)
            this.res.status(200).json({
                message: `Admin ${model.email} saved`
            })
        })
    }
}
module.exports = {
    addAdmin: AddAdmin
}