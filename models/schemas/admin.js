/**
 * Admin Schema
 */
module.exports = require('mongoose').Schema({
    name: String,
    email: String,
    hash: String,
    role: String,
    approved: {
        type: Boolean,
        default: false
    },
    su: {
        type: Boolean,
        default: false
    },
    recovery: {
        question: String,
        hash: String
    },
    meta: {
        mygroups: Array,
        students: Number
    }
})