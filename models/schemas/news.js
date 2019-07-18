/**
 * News Feed Schema
 */
module.exports = require('mongoose').Schema({
    date: Object,
    sender: String,
    message: String
})