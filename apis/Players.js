const express = require('express')
const router = express.Router()
const { addStudent, compareStudent, deleteStudent } = require('../managers/Student')
const { findByEmail, findAll, allData, highscore } = require('../managers/Query')

router
    .post('/list', (req, res) => {
        // lists all students (email, ids)
        new findAll(req.query.filter, (results) => {
            res.json(results)
        })
    })
    .post('/highscore', (req, res) => {
        new highscore((students) => {
            res.json(students)
        })
    })

module.exports = router