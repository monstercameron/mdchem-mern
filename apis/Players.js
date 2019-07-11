const express = require('express')
const router = express.Router()
const { addStudent, compareStudent, deleteStudent } = require('../managers/Student')
const { findByEmail, findAll, allData, highscore } = require('../managers/Query')
const highScoreService = require('../services/services/Highscore')

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
    .post('/highscore/update', (req, res) => {
        new highScoreService()
        res.json({message:`High Score Manually Updated`})
    })

module.exports = router