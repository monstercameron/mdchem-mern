const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    fname: String,
    lname: String,
    created: Date
})