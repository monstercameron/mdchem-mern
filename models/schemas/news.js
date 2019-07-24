/**
 * News Feed Schema
 */
module.exports = require('mongoose').Schema({
    date: String,
    sender: String,
    message: String
})