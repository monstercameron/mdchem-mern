/**
 * Player Route
 */
const router = require('express').Router()
const highScoreService = require('../services/services/Highscore')
const {
    countStudentsPerClass
} = require('../managers/Student')
const {
    findAllStudents,
    countStudent,
    highscore
} = require('../managers/Student')
router
    .get('/count/:group', countStudentsPerClass)
    .get('/list/', (req, res) => {
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
        res.json({
            message: `High Score Manually Updated`
        })
    })
module.exports = router