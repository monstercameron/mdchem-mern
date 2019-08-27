/**
 * Player Route
 */
const router = require('express').Router()
const highScoreService = require('../services/services/Highscore')
const {
    averageScore,
    countStudentsPerClass,
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
    .get('/average', averageScore)
    .get('/count', (req, res) => {
        new countStudent(req, res)
    })
    .get('/highscore/update', (req, res) => {
        new highScoreService()
        res.json({
            results:{
                message: `High Score Manually Updated`
            }
        })
    })
module.exports = router