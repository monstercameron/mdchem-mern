/**
 * News Feed Route
 */
const router = require('express').Router()
const {
    create,
    read,
    update,
    deletion
} = require('../managers/News')
router
    .post('/', (req, res) => {
        new create(req, res)
    })
    .get('/', (req, res) => {
        new read(req, res)
    })
    .patch('/', (req, res) => {
        new update(req, res)
    })
    .delete('/', (req, res) => {
        new deletion(req, res)
    })
module.exports = router