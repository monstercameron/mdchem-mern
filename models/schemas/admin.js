const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    role: String,
    name: String,
    email: String,
    hash: String,
    recovery: String,
    login: Object,
    loggedIn: Boolean
})