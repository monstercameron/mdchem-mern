/**
 * Admin  Manager
 */
const db = require('../managers/Database')
const Admin = require('../models/schemas/admin')
const {
    Hash,
    Compare
} = require('../managers/Encrypt')
const {
    adminEmailExist
} = require('../managers/Query')
const {
    createToken
} = require('../managers/Authentication')
/**
 * Add Admin
 */
class AddAdmin {
    constructor(req, res) {
        this.res = res
        this.body = req.body
        this.run()
    }
    run = () => {
        this.validateAdmin()
    }
    validateAdmin = () => {
        // Validation TBC
        new AdminEmailExists(this.body.email, (results) => {
            if (results) {
                return this.res.status(400).json({
                    results: {
                        message: `${this.body.email} already registered`
                    }
                })
            }
            this.primaryhash()
        })
    }
    primaryhash = () => {
        new Hash(this.body.password, (hash) => {
            const admin = db.model('admin', Admin, 'admin');
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
        const {
            question,
            answer
        } = this.body.recovery
        new Hash(question + answer, (hash) => {
            this._admin.recovery.hash = hash
            //console.log(this._admin)
            this.saveAdmin()
            //this.res.send('works')
        })
    }
    saveAdmin = () => {
        this._admin.save((err, model) => {
            if (err) throw this.res.status(500).json({
                results: {
                    error: err
                }
            })
            // console.log(model)
            this.res.status(200).json({
                results: {
                    message: `Admin ${model.email} saved`
                }
            })
        })
    }
}
/**
 * Login by generating a token
 */
class AuthenticateAdmin {
    constructor(req, res) {
        this.res = res
        this.body = req.body
        this.run()
    }
    run = () => {
        this.validation()
    }
    validation = () => {
        this.emailExists()
    }
    emailExists = () => {
        new AdminEmailExists(this.body.email, (result) => {
            if (!result) this.res.status(400).json({
                results: {
                    message: `user ${this.body.email} doesn't exist`
                }
            })
            //console.log(result)
            this._admin = result
            this.checkPassword()
        })
    }
    checkPassword = () => {
        const {
            password
        } = this.body
        const {
            hash
        } = this._admin
        new Compare(password, hash, (result) => {
            //console.log(`result:`, result)
            if (result) {
                this.generateToken()
            } else {
                this.res.status(401).json({
                    results: {
                        message: `Credentials did not match.`
                    }
                })
            }
        })
    }
    generateToken = () => {
        const params = {
            payload: {
                role: `admin`
            },
            options: {
                expiresIn: 60 * 60 * 24 // 24 hours
            }
        }
        createToken(params)
            .then(token => this.res.status(200)
                .cookie('token', token, {
                    maxAge: 1000*60*60*12 /* 12 hours */,
                    httpOnly: true
                })
                .json({
                    results: {
                        message: `Successfully Authenticated.`
                    }
                }))
            .catch(err => this.res.status(500).json({
                results: {
                    error: err,
                    message: `There was an error.`
                }
            }))
    }
}
/**
 * Check if Admin already exists via email
 */
class AdminEmailExists {
    constructor(email, callback) {
        this.email = email
        this.callback = callback
        this.run()
    }
    run = () => {
        this.query()
    }
    query = () => {
        const admin = db.model('admin', Admin, 'admin')
        admin.findOne({
            email: this.email
        }, (err, docs) => {
            //console.log('email exists results:',docs)
            this.callback(docs)
        })
    }
}
/**
 * Reset Admin Password
 */
class ResetAdminPassword {
    constructor(req, res) {
        this.body = req.body
        this.res = res
        this.run()
        //res.json(this.body)
    }
    run = () => {
        this.emailExists()
    }
    emailExists = () => {
        new AdminEmailExists(this.body.email, (result) => {
            if (!result) this.res.status(400).json({
                results: {
                    message: `user ${this.body.email} doesn't exist`
                }
            })
            //console.log(result)
            this._admin = result
            this.checkSecretQuestion()
        })
    }
    checkSecretQuestion = () => {
        const {
            question,
            answer
        } = this.body
        const {
            hash
        } = this._admin.recovery
        new Compare(question + answer, hash, (result) => {
            //console.log(`result:`, result)
            if (result) {
                this.generateNewHash()
            } else {
                this.res.status(401).json({
                    results: {
                        message: `Credentials did not match.`
                    }
                })
            }
        })
    }
    generateNewHash = () => {
        new Hash(this.body.password, (hash) => {
            this._admin.hash = hash
            //console.log(this._admin)
            this.updatePassword()
        })
    }
    updatePassword = () => {
        this._admin.save((err, model) => {
            if (err) throw this.res.status(500).json({
                results: {
                    error: err
                }
            })
            // console.log(model)
            this.res.status(200).json({
                results: {
                    message: `Admin ${model.email} password updated!`
                }
            })
        })
    }
}
module.exports = {
    addAdmin: AddAdmin,
    authenticateAdmin: AuthenticateAdmin,
    adminEmailExist: AdminEmailExists,
    resetAdminPassword: ResetAdminPassword
}