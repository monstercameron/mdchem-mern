const express = require('express')
const router = express.Router()
const { addStudent, compareStudent, deleteStudent, countStudent } = require('../managers/Student')
const { findByEmail, findAll, allData, highscore } = require('../managers/Query')
const highScoreService = require('../services/services/Highscore')

router
    // lists all students (email, ids)
    .get('/list', (req, res) => {
        new findAll(req.query.filter, (results) => {
            res.json(results)
        })
    })
    .get('/highscore', (req, res) => {
        new highscore((students) => {
            res.json(students)
        })
    })
    .get('/count', (req, res) => {
        new countStudent(req, res)
    })
    .post('/highscore/update', (req, res) => {
        new highScoreService()
        res.json({ message: `High Score Manually Updated` })
    })

module.exports = router