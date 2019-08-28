/**
 * Admin Route
 */
const router = require('express').Router()
const {
    adminGroups,
    addAdminGroups,
    deleteAdminGroups,
    countAdminGroups
} = require('../managers/Admin')
const {
    isAuthAdmin
} = require('../middleware/Authentication')
module.exports = router
    .post('/groups', adminGroups)
    .post('/groups/add', addAdminGroups)
    .post('/groups/delete', deleteAdminGroups)
    .get('/groups/count', countAdminGroups)