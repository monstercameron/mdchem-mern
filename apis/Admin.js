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
    .post('/groups', isAuthAdmin, adminGroups)
    .post('/groups/add', isAuthAdmin, addAdminGroups)
    .post('/groups/delete', isAuthAdmin, deleteAdminGroups)
    .get('/groups/count', isAuthAdmin, countAdminGroups)