const express = require('express')
const router = express.Router()
const { addStudent, compareStudent, deleteStudent } = require('../managers/Student')
const { findByEmail } = require('../managers/Query')

/**
 * Player CRUD
 */
router
    .post('/', (req, res) => {
        new addStudent(res, req.body)
    })
    .post('/compare', (req, res) => {
        new findByEmail(req.body, (model) => {
            new compareStudent(res, req.body, model.hash, (result) => {
                res.send(result)
            })
        })
    })
    .put('/', (req, res) => {
        res.send('player route put')
    })
    .delete('/', (req, res) => {
        new deleteStudent(res, req.body)
    })

module.exports = router