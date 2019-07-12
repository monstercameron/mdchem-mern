const router = require('express').Router()
const { addStudent } = require('../managers/Student')
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
        // validate incoming data
        // create user model
        // hash password
        // store user model
        console.log(req.body)
        const { role } = req.body
        switch(role){
            case 'student': new addStudent(res, req.body)
                break
            case 'admin': res.send('wip')
                break
            default: res.status(400).json({message:`There was a problem with the selected role`})
                break
        }
    })

module.exports = router