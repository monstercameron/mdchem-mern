const express = require('express')
const router = express.Router()

router
    .get('/', (req, res) => {
        res.send('players route')
    })
    .post('/', (req, res) => {
        res.send('players route')
    })

module.exports = router