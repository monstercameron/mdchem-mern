/**
 * Player Route
 */
const router = require('express').Router()
const highScoreService = require('../services/services/Highscore')
const averageScoreService = require('../services/services/AverageScore')
const {
    averageScore,
    countStudentsPerClass,
    findAllStudents,
    countStudent,
    highscore
} = require('../managers/Student')
module.exports = router
    .get('/count/:group', countStudentsPerClass)
    .get('/list/', (req, res) => new findAllStudents(req, res))
    .get('/highscore', highscore)
    .get('/average', averageScore)
    .get('/count', countStudent)
    .get('/highscore/update', (req, res) => {
        new highScoreService()
        new averageScoreService()
        res.json({
            results: {
                message: `High Score Manually Updated`
            }
        })
    })