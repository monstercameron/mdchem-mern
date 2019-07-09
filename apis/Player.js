const express = require('express')
const router = express.Router()
const { addStudent, compareStudent, deleteStudent } = require('../managers/Student')
const { findByEmail, findAll, allData, highscore } = require('../managers/Query')
/**
 * Player CRUD
 */
router
    .post('/', (req, res) => {
        // creating a new student
        // needs email, password & class
        new addStudent(res, req.body)
    })
    .patch('/', (req, res) => {
        // updates the student model
        // appends or overwrites level scores
        const updatedData = req.body.data
        new findByEmail(req.body, (model) => {
            let { data } = model
            let newData
            if(!data) {
                newData = updatedData
            }else{
                newData = Object.assign(data, updatedData)
            }
            model.updateOne({data:newData}, (err, result) => {
                res.json({updated:result,message:'model updated'})
            })
        })
    })
    .delete('/', (req, res) => {
        // deletes a student from the database
        new deleteStudent(res, req.body)
    })
    .post('/login', (req, res) => {
        // find student by email
        // checks password against stored hash
        // WIP returns auth token
        new findByEmail(req.body, (model) => {
            new compareStudent(res, req.body, model.hash, (result) => {
                res.send(result)
            })
        })
    })

module.exports = router