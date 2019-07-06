const express = require('express')
const router = express.Router()

/**
 * Player CRUD
 */
router
    .post('/add', (req, res) => {
        res.send('player route post')
    })
    .put('/', (req, res) => {
        res.send('player route put')
    })
    .delete('/', (req, res) => {
        res.send('player route delete')
    })

module.exports = router