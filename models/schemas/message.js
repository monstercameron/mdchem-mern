/**
 * Message Schema
 */
module.exports = require('mongoose').Schema({
    target: String,
    cc: Array,
    bcc: Array,
    sender: String,
    subject: String,
    message: String
})