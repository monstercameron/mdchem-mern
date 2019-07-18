/**
 * Player Route
 */
const router = require('express').Router()
const {
    addStudent,
    deleteStudent,
    findStudentById,
    updateStudent
} = require('../managers/Student')
router
    .get('/', (req, res) => {
        new findStudentById(req, res)
    })
    .patch('/', (req, res) => {
        new updateStudent(req, res)
    })
    .delete('/', (req, res) => {
        new deleteStudent(req, res)
    })
module.exports = router