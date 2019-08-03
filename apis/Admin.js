/**
 * Admin Route
 */
const express = require('express')
const {
    Hash
} = require('../managers/Encrypt')
const router = express.Router()
router
    .get('/', (req, res) => {
        //console.log(req.cookies)
        new Hash('test', (hash) => {
            console.log(hash)
            res.send(hash)
        })
        //res.send('admin route')
    })
    .post('/', (req, res) => {
        res.send('admin route')
    })
module.exports = router