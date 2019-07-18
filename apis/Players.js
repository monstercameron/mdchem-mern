/**
 * Player Route
 */
const express = require('express')
const router = express.Router()
const highScoreService = require('../services/services/Highscore')
const {
    findAllStudents,
    countStudent,
    highscore
} = require('../managers/Student')
router
    .get('/list', (req, res) => {
        new findAllStudents(req, res)
    })
    .get('/highscore', (req, res) => {
        new highscore(req, res)
    })
    .get('/count', (req, res) => {
        new countStudent(req, res)
    })
    .post('/highscore/update', (req, res) => {
        new highScoreService()
        res.json({ message: `High Score Manually Updated` })
    })
module.exports = router