/**
 * Admin Route
 */
const router = require('express').Router()
const {
    adminGroups,
    addAdminGroups
} = require('../managers/Admin')
router
.post('/groups', adminGroups)
.post('/groups/add', addAdminGroups)
module.exports = router