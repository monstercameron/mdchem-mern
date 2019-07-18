/**
 * Student Schema
 */
module.exports = require('mongoose').Schema({
    email: String,
    hash: String,
    score: Number,
    data: Object,
    role: String,
    recovery: {
        question: String,
        hash: String
    },
    meta: {
        group: String,
        login: Object
    }
})