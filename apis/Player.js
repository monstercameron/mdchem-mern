const express = require('express')
const router = express.Router()
const { addStudent, compareStudent, deleteStudent } = require('../managers/Student')
const { findByEmail, findAll, allData } = require('../managers/Query')

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
            const { data } = model
            const newData = Object.assign(data, updatedData)
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
    .post('/list', (req, res) => {
        // lists all students (email, ids)
        new findAll(req.query.filter, (results) => {
            res.json(results)
        })
    })
    .post('/all', (req, res) => {
        // lists all students and all data
        new allData((results) => {
            res.json(results)
        })
    })

module.exports = router