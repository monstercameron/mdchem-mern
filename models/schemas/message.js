const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    target: String,
    cc: Array,
    bcc: Array,
    sender: String,
    subject: String,
    message: String
})