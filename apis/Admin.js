/**
 * Admin Route
 */
const express = require('express')
const router = express.Router()
router
    .get('/', (req, res) => {
        res.send('admin route')
    })
    .post('/', (req, res) => {
        res.send('admin route')
    })
module.exports = router