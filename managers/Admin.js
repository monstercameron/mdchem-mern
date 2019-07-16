const db = require('../managers/Database')
const adminSch = require('../models/schemas/admin')
const { Hash, Compare } = require('../managers/Encrypt')
const { adminEmailExist } = require('../managers/Query')
const { createToken, verifyToken } = require('../managers/Authentication')
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
        new adminEmailExist(this.body.email, (results) => {
            console.log(results === null)
            if (results) {
                this.res.status(400).json({ message: `${this.body.email} already registered` })
            } else {
                this.primaryhash()
            }
        })
    }
    primaryhash = () => {
        console.log('runs')
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
        const { question, answer } = this.body.recovery
        new Hash(question + answer, (hash) => {
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
/**
 * Login by generating a token
 */
class AuthenticateAdmin {
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
        new adminEmailExist(this.body.email, (result) => {
            if (!result) this.res.status(400).json({ message: `user ${this.body.email} doesn't exist` })
            //console.log(result)
            this._admin = result
            this.checkPassword()
        })
    }
    checkPassword = () => {
        const { password } = this.body
        const { hash } = this._admin
        new Compare(password, hash, (result) => {
            //console.log(`result:`, result)
            if (result) {
                this.generateToken()
            } else {
                this.res.status(401).json({ message: `Credentials did not match.` })
            }
        })
    }
    generateToken = () => {
        const params = {
            payload: { role: `admin` },
            options: {
                expiresIn: 60 * 60 * 24 // 24 hours
            }
        }
        createToken(params)
            .then(token => this.res.status(200).json({ token: token, message: `Successfully Authenticated.` }))
            .catch(err => this.res.status(500).json({ error: err, message: `There was an error.` }))
    }
}
module.exports = {
    addAdmin: AddAdmin,
    authenticateAdmin: AuthenticateAdmin
}