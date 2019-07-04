const express = require('express')
const router = express.Router()
const db = require('../managers/Database')

router
    .get('/:test', (req, res) => {
        console.log(req.query, req.params)
        res.send(`hello ${req.params.test}`)
    })
    .post('/', (req, res) => {
        res.send('auth route')
    })

module.exports = router