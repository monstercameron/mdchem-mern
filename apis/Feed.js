/**
 * News Feed Handler CRUD
 */
const router = require('express').Router()
const { create, read, update, deletion } = require('../managers/News')
router
    .put('/', (req, res) => {
        console.log(`Saving News Item Status:`)
        new create(res, req.body)
    })
    .post('/', (req, res) => {
        console.log(`All News Items:`)
        new read(res, req.body)
    })
    .patch('/', (req, res) => {
        console.log(`Saving News Item Status:`)
        new update(res, req.body)
    })
    .delete('/', (req, res) => {
        console.log(`Deleting News Item Status:`)
        new deletion(res, req.body)
    })
module.exports = router