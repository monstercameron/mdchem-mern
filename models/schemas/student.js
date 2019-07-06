const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    email: String,
    hash: String,
    score: Number,
    login: Object,
    data: Object
})