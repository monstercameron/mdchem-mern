const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    date: Object,
    sender: String,
    message: String
})