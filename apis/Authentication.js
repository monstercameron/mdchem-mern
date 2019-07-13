const router = require('express').Router()
const { addStudent } = require('../managers/Student')
const { addAdmin } = require('../managers/Admin')
router
// Note usable auth code
// .post('/login', (req, res) => {
//     // find student by email
//     // checks password against stored hash
//     // WIP returns auth token
//     new findByEmail(req.body, (model) => {
//         new compareStudent(res, req.body, model.hash, (result) => {
//             res.send(result)
//         })
//     })
// })
    .post('/login', (req, res) => {
        // find user by email
        // compare user has to password
        // generate a new jwt
        res.send('auth route')
    })
    .post('/register', (req, res) => {
        const { role } = req.body
        switch(role){
            case 'student': new addStudent(res, req.body)
                break
            case 'admin': new addAdmin(res, req.body)
                break
            default: res.status(400).json({message:`There was a problem with the selected role`})
                break
        }
    })
module.exports = router