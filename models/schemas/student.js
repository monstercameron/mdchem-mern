const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    email: String,
    hash: String,
    recovery: String,
    score: Number,
    data: Object,
    class: String,
    login: Object,
    data: Object
})