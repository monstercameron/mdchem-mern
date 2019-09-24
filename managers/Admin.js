/**
 * @name Admin Manager
 */
const {
    db,
    con
} = require('../managers/Database')
const Admin = require('../models/schemas/admin')
const {
    Hash,
    Compare,
    hash,
    compare
} = require('../managers/Encrypt')
const {
    adminEmailExist
} = require('../managers/Query')
const {
    createToken
} = require('../managers/Authentication')
const util = require('util');
const fs = require('fs');
/**
 * Add Admin
 */
class AddAdmin {
    constructor(req, res) {
        this.res = res
        this.body = req.body
        console.log('the body: ', this.body)
        this.run()
    }
    run = () => {
        this.validateAdmin()
    }
    validateAdmin = () => {
        // Validation TBC
        new AdminEmailExists(this.body.email.toLowerCase(), (results) => {
            if (results) {
                return this.res.status(400).json({
                    results: {
                        message: `${this.body.email} already registered`
                    }
                })
            }
            //console.log('validate admin')
            this.primaryhash()
        })
    }
    primaryhash = () => {
        new Hash(this.body.password.toLowerCase(), (hash) => {
            console.log(hash)
            const admin = db.model('admin', Admin);
            this._admin = new admin({
                name: this.body.name,
                email: this.body.email.toLowerCase(),
                role: this.body.role,
                hash: hash,
                recovery: {
                    question: this.body.recovery.question
                }
            })
            //console.log('primary hash')
            this.recoveryHash()
        })
    }
    recoveryHash = () => {
        const {
            question,
            answer
        } = this.body.recovery
        new Hash(question + answer.toLowerCase(), (hash) => {
            this._admin.recovery.hash = hash
            console.log(hash)
            //console.log('recovery hash')
            this.saveAdmin()
            //this.res.send('works')
        })
    }
    saveAdmin = () => {
        this._admin.save((err, model) => {
            if (err) return this.res.status(500).json({
                results: {
                    error: err
                }
            })
            //console.log('save admin')
            this.res.status(200).json({
                results: {
                    message: `Admin ${model.email} saved`
                }
            })
        })
    }
}
const addAdmin = async (req, res) => {
    try {
        const {
            name,
            email,
            role,
            password
        } = req.body
        const {
            question,
            answer
        } = req.body.recovery
        const checkEmail = await adminEmailExists({
            email: email.toLowerCase()
        })
        if (checkEmail) throw new Error(`Admin '${email}' already exists!`)
        const mainHash = await hash({
            password: password
        })
        const recoveryHash = await hash({
            password: question + answer
        })
        const admin = db.model('admin', Admin);
        const anAdmin = new admin({
            name: name,
            email: email.toLowerCase(),
            role: role,
            hash: mainHash,
            recovery: {
                question: question,
                hash: recoveryHash
            }
        })
        anAdmin.save()
        res.json({
            results: {
                message: `Admin ${email} registered!`
            }
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: error.message
        })
    }
}
/**
 * @name - Authenticate Admin
 * @description - Admin authentication and token mechanism
 */
const authenticateAdmin = async (req, res) => {
    try {
        //validation/sanity check
        const {
            email,
            password
        } = req.body
        await adminEmailExists({
            email: email
        })
        const query = await getAdmin({
            email: email
        })
        await compare({
            hash: query.hash,
            password: password
        })
        const params = {
            payload: {
                role: `admin`,
                email: email,
                id: query._id,
                su: query.su ? query.su : false
            },
            options: {
                expiresIn: 1000 * 60 * 60 * 12 /* 12 hours */
            }
        }
        const token = await createToken(params)
        res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 12 /* 12 hours */ ,
                httpOnly: true
            })
            .json({
                results: {
                    message: `Successfully Authenticated.`
                }
            })
    } catch (error) {
        // console.log('error',error)
        res.status(401).json({
            error: error.message
        })
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
        const admin = db.model('admin', Admin)
        admin.findOne({
            email: this.email
        }, (err, docs) => {
            //console.log('email exists results:',docs)
            this.callback(docs)
        })
    }
}
/**
 * @name Admin Email Exists
 * @description Check If Admin Email Exists
 */
const adminEmailExists = async ({
    email
}) => {
    const admin = db.model('admin', Admin)
    const query = await admin.findOne({
        email: email
    })
    return query ? true : false
}
/**
 * @name Get Admin
 * @description find and returns and admin
 * @param {string} email - 
 * @returns admin object
 */
const getAdmin = async ({
    email
}) => {
    const admin = db.model('admin', Admin)
    const query = await admin.findOne({
        email: email
    })
    return new Promise((resolve, reject) => {
        query ? resolve(query) : reject(new Error(`Admin '${email}' doesn't exist`))
    })
}
/**
 * @name Reset Admin Password 
 * @description resets the admin password based on the security question
 */
const resetAdminPasswordWithSecQuestion = async (req, res) => {
    try {
        const {
            email,
            password,
            question,
            answer
        } = req.body
        await adminEmailExists({
            email: email
        })
        const query = await getAdmin({
            email: email
        })
        // console.log(query)
        await compare({
            password: question + answer,
            hash: query.recovery.hash
        })
        query.hash = await hash({
            password: password
        })
        await query.save()
        res.json({
            results: {
                message: `Admin ${query.email} password updated!`
            }
        })
    } catch (error) {
        // console.log(error)
        res.json({
            error: error.message
        })
    }
}
/**
 * @name Reset Admin Password 
 * @description resets the admin password if password is know
 */
const resetAdminPassword = async (req, res) => {
    try {
        const {
            email,
            oldPassword,
            newPassword
        } = req.body
        await adminEmailExists({
            email: email
        })
        const query = await getAdmin({
            email: email
        })
        // console.log(query)
        await compare({
            hash: query.hash,
            password: oldPassword
        })
        // console.log(req.body)
        query.hash = await hash({
            password: newPassword
        })
        await query.save()
        res.json({
            results: {
                message: `Admin ${query.email} password updated!`
            }
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: error.message
        })
    }
}
/**
 * @name Admin Groups
 * @description queries database and returns a list of groups for specified admin
 */
const adminGroups = async (req, res) => {
    try {
        const admin = db.model('admin', Admin)
        const query = await admin.findOne({
            email: req.body.email
        }).select('-hash -recovery')
        // console.log(query)
        res.json({
            results: {
                groups: query ? query.meta.mygroups : null
            }
        })
    } catch (error) {
        res.json({
            results: {
                error: error.message
            }
        })
    }
}
/**
 * @name Add Admin Groups
 * @description appends a new  group tothe admin object
 */
const addAdminGroups = async (req, res) => {
    try {
        const admin = db.model('admin', Admin)
        const query = await admin.findOne({
            email: req.body.email
        }).select('-hash -recovery')

        console.log(query)

        query.meta.mygroups.push({
            id: req.body.id,
            notes: req.body.notes
        })
        await query.save()

        console.log(query)
        res.json({
            results: {
                message: 'Admin Updated'
            }
        })
    } catch (error) {
        res.json({
            results: {
                error: error.message
            }
        })
    }
}
/**
 * @name Delete Admin Groups
 * @description Removes a group from the admin object
 */
const deleteAdminGroups = async (req, res) => {
    try {
        const admin = db.model('admin', Admin)
        const query = await admin.findOne({
            email: res.locals.email
        }).select('-hash -recovery')
        // console.log(query)
        const updatedGroups = query.meta.mygroups.filter((group) => group.id !== req.body.group)
        query.meta.mygroups = updatedGroups
        await query.save()
        // console.log(query)
        res.json({
            results: {
                message: 'Admin Updated'
            }
        })
    } catch (error) {
        res.json({
            results: {
                error: error.message
            }
        })
    }
}
/**
 * @name Count Admin Groups
 * @description counts the number of groups amongst all admins
 */
const countAdminGroups = async (req, res) => {
    try {
        const admins = db.model('Admins', Admin)
        const query = await admins.find({})
        const groups = []
        for (const admin of query) {
            for (const group of admin.meta.mygroups) {
                if (!groups.includes(group)) groups.push(group)
            }
        }
        // console.log('count:', count)
        res.json({
            results: {
                count: groups.length
            }
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: error.response
        })
    }
}
/**
 * @name Approve Admin
 * @description allows addmins access to backend
 */
const approveAdmin = async (req, res) => {
    if (res.locals.su) {
        try {
            console.log(res.locals)
            const admins = db.model('Admins', Admin)
            const query = await admins.findById(req.body.id)
            query.approved = req.body.approved
            query.save()
            res.json({
                results: {
                    message: `Admin '${query.email}' ${query.approved?'':' un'}approved!`
                }
            })
        } catch (error) {
            res.json({
                error: error
            })
        }
    } else {
        res.status(401).json({
            error: `${res.locals.email} doesn't have this permission, please contact webmaster!`
        })
    }
}
/**
 * @name Listof Admins
 * @description returns a list of admins and associated meta data 
 */
const getListOfAdmins = async (req, res) => {
    try {
        // console.log(res.locals)
        const admins = db.model('Admins', Admin)
        const query = await admins.find({})
            .select('-hash -recovery')
        res.json({
            results: {
                admins: query
            }
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
}
/**
 * @name Delete Admin
 * @description Removes a specified admin frothe database
 */
const deleteAdmin = async (req, res) => {
    if (res.locals.su) {
        try {
            console.log(res.locals)
            const admins = db.model('Admins', Admin)
            const query = await admins.findById(req.body.id)
            await query.remove()
            res.json({
                results: {
                    message: `Admin '${query.email}' was deleted`
                }
            })
        } catch (error) {
            res.json({
                error: error
            })
        }
    } else {
        res.status(401).json({
            error: `${res.locals.email} doesn't have this permission, please contact webmaster!`
        })
    }
}
/**
 * @name  Get Server Logs
 * @description Returns the last n lines of the currentlog
 */
const getServerLogs = async (req, res) => {
    try {
        const readdir = util.promisify(fs.readdir)
        const files = await readdir(`./logs`)
        console.log(req.params)
        console.log(files)
        if (!req.params.fileName) {
            res.json({
                results: {
                    files: files
                }
            })
            return
        }
        const readLastLines = require('read-last-lines');
        const lines = await readLastLines.read(`./logs/${req.params.fileName}`, req.query.lines)
        res.json({
            results: {
                lines: lines
            }
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: error
        })
    }
}
module.exports = {
    AddAdmin,
    addAdmin,
    adminEmailExist: AdminEmailExists,
    adminGroups,
    addAdminGroups,
    deleteAdminGroups,
    countAdminGroups,
    adminEmailExists,
    getAdmin,
    authenticateAdmin,
    resetAdminPassword,
    resetAdminPasswordWithSecQuestion,
    approveAdmin,
    getListOfAdmins,
    deleteAdmin,
    getServerLogs
}