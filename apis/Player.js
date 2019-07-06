const express = require('express')
const router = express.Router()

router
    .get('/', (req, res) => {
        res.send('player route')
    })
    .post('/', (req, res) => {
        res.send('player route')
    })

module.exports = router