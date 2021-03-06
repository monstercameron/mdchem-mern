/**
 * Auth Route
 */
const router = require('express').Router()
const {
    addStudent,
    authenticateStudent,
    resetStudentPassword
} = require('../managers/Student')
const {
    addAdmin,
    authenticateAdmin,
    resetAdminPassword
} = require('../managers/Admin')
const {
    verifyToken
} = require('../managers/Authentication')
router
    .get('/check', (req, res) => {
        verifyToken(req.query.token)
            .then(decoded => {
                //console.log(decoded)
                res.status(200).json({
                    results: {
                        message: decoded
                    }
                })
            })
            .catch(err => {
                //console.log(err)
                res.status(401).json({
                    results: {
                        message: err
                    }
                })
            })
    })
    .post('/check', (req, res) => {
        verifyToken(req.cookies.token)
            .then(decoded => {
                //console.log(decoded)
                res.status(200).json({
                    results: {
                        message: true
                    }
                })
            })
            .catch(err => {
                //console.log(err)
                res.status(401).json({
                    results: {
                        message: err
                    }
                })
            })
    })
    .get('/ping', (req, res) => {
        verifyToken(req.cookies.token)
            .then(decoded => {
                //console.log(decoded)
                res.status(200).send('true')
            })
            .catch(err => {
                //console.log(err)
                res.status(400).json('false')
            })
    })
    .get('/logout', (req, res) => {
        res.cookie('token', {
            maxAge: Date.now()
        })
        res.status(200).json({
            results: {
                message: 'User Cookie expired! User logged out!'
            }
        })
    })
    .post('/login/:role', (req, res) => {
        switch (req.params.role) {
            case 'student':
                new authenticateStudent(req, res)
                break
            case 'admin':
                new authenticateAdmin(req, res)
                break
            default:
                res.status(401).json({
                    message: `No role selected`
                })
        }
    })
    .post('/register/:role', (req, res) => {
        switch (req.params.role) {
            case 'student':
                new addStudent(req, res)
                break
            case 'admin':
                new addAdmin(req, res)
                break
            default:
                res.status(401).json({
                    message: `There was a problem with the selected role`
                })
                break
        }
    })
    .post('/reset/:role', (req, res) => {
        switch (req.params.role) {
            case 'admin':
                new resetAdminPassword(req, res)
                break
            case 'student':
                new resetStudentPassword(req, res)
                break
            default:
                res.status(400).json({
                    results: {
                        message: `Please Specify a role!`
                    }
                })
        }
    })
module.exports = router