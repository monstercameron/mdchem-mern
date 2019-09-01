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
    .get('/:id', (req, res) => {
        new findStudentById(req, res)
    })
    .patch('/', (req, res) => {
        new updateStudent(req, res)
    })
    .delete('/', deleteStudent)
module.exports = router