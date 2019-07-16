const router = require('express').Router()
const { addStudent, authenticateStudent } = require('../managers/Student')
const { addAdmin, authenticateAdmin } = require('../managers/Admin')
// testing
const { verifyToken } = require('../managers/Authentication')
//
router
// testing
    .get('/check', (req, res) => {
        verifyToken(req.query.token)
        .then( decoded => {
            //console.log(decoded)
            res.status(200).json({expired:false})
        })
        .catch( err => {
            //console.log(err)
            res.status(401).json(err)
        })
    })
    .post('/login/:role', (req, res) => {
        switch(req.params.role){
            case 'student': new authenticateStudent(res, req.body)
                break
            case 'admin': new authenticateAdmin(res, req.body)
                break
            default:    res.status(401).json({message:`No role selected`})
        }
    })
    .post('/register', (req, res) => {
        const { role } = req.body
        switch(role){
            case 'student': new addStudent(res, req.body)
                break
            case 'admin': new addAdmin(res, req.body)
                break
            default: res.status(401).json({message:`There was a problem with the selected role`})
                break
        }
    })
module.exports = router