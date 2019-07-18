/**
 * Admin Schema
 */
module.exports = require('mongoose').Schema({
    name: String,
    email: String,
    hash: String,
    role: String,
    recovery: {
        question: String,
        hash: String
    },
    meta: {
        mygroups: Array,
        students: Number
    }
})