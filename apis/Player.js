const express = require('express')
const router = express.Router()
const { addStudent, compareStudent } = require('../managers/Student')
const { findByEmail } = require('../managers/Query')

/**
 * Player CRUD
 */
router
    .post('/add', (req, res) => {
        const student = new addStudent(res, req.body)
    })
    .post('/compare', (req, res) => {
        new findByEmail(req.body, (model) => {
            new compareStudent(res, req.body, model.hash, (answer) => {
                res.send(answer)
            })
        })
    })
    .put('/', (req, res) => {
        res.send('player route put')
    })
    .delete('/', (req, res) => {
        res.send('player route delete')
    })

module.exports = router