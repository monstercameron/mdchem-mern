const express = require('express')
const router = express.Router()
const { allFeed } = require('../managers/Query')
const News = require('../managers/News')

router
    .post('/', (req, res) => {
        console.log(`All News Items:`)
        new allFeed((news) => {
            res.json(news)
        })
    })
    .post('/add', (req, res) => {
        console.log(`Saving News Item Status:`)
        new News(res, req.body)
    })
    .delete('/', (req, res) => {
        
    })

module.exports = router