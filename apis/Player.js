const router = require('express').Router()
const { addStudent, deleteStudent } = require('../managers/Student')
const { findByEmail, findById } = require('../managers/Query')
/**
 * Player CRUD
 */
router
    .put('/', (req, res) => {
        // creating a new student
        // needs email, password & class
        new addStudent(res, req.body)
    })
    .post('/', (req, res) => {
        // return data for a specific user
        console.log(`Querying DB for ID:${req.body.id}`)
        new findById(req.body.id, (model) => {
            res.json(model)
        })
    })
    .patch('/', (req, res) => {
        // updates the student model
        // appends or overwrites level scores
        const updatedData = req.body.data
        new findByEmail(req.body, (model) => {
            let { data } = model
            let newData
            
            if(!data) newData = updatedData
            else newData = Object.assign(data, updatedData)

            model.updateOne({data:newData}, (err, result) => {
                res.json({updated:result,message:'model updated'})
            })
        })
    })
    .delete('/', (req, res) => {
        // deletes a student from the database
        new deleteStudent(res, req.body)
    })
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
module.exports = router