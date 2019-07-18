/**
 * Auth Route
 */
const router = require('express').Router()
const { addStudent, authenticateStudent } = require('../managers/Student')
const { addAdmin, authenticateAdmin } = require('../managers/Admin')
const { verifyToken } = require('../managers/Authentication')
router
    .get('/check', (req, res) => {
        verifyToken(req.query.token)
            .then(decoded => {
                //console.log(decoded)
                res.status(200).json({ expired: false })
            })
            .catch(err => {
                //console.log(err)
                res.status(401).json(err)
            })
    })
    .post('/login/:role', (req, res) => {
        switch (req.params.role) {
            case 'student': new authenticateStudent(req, res)
                break
            case 'admin': new authenticateAdmin(req, res)
                break
            default: res.status(401).json({ message: `No role selected` })
        }
    })
    .post('/register/:role', (req, res) => {
        switch (req.params.role) {
            case 'student': new addStudent(req, res)
                break
            case 'admin': new addAdmin(req, res)
                break
            default: res.status(401).json({ message: `There was a problem with the selected role` })
                break
        }
    })
module.exports = router