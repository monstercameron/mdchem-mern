/**
 * Test  Schema
 */
const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    fname: String,
    lname: String,
    has: {
        car: Boolean
    },
    created: Date
})