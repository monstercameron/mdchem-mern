/**
 * Player Route
 */
const router = require('express').Router()
const {
    addStudent,
    deleteStudent,
    findStudentById,
    updateStudent,
    changeStudentGroup,
    studentStarStatus,
    resetStudentData,
    deleteStudentLevelData
} = require('../managers/Student')
const {
    isAuthStudent,
    isAuthAdmin
} = require('../middleware/Authentication')
router
    .get('/:id', isAuthStudent, (req, res) => new findStudentById(req, res))
    .patch('/', isAuthStudent, (req, res) => new updateStudent(req, res))
    .delete('/', isAuthAdmin, deleteStudent)
    .post('/group', isAuthAdmin, changeStudentGroup)
    .post('/stars:format', isAuthStudent, studentStarStatus)
    .post('/reset', isAuthAdmin, resetStudentData)
    .post('/reset/level', isAuthAdmin, deleteStudentLevelData)
module.exports = router