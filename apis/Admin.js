/**
 * Admin Route
 */
const router = require('express').Router()
const {
    adminGroups,
    addAdminGroups,
    deleteAdminGroups,
    countAdminGroups,
    approveAdmin,
    getListOfAdmins,
    deleteAdmin,
    getServerLogs
} = require('../managers/Admin')
module.exports = router
    .get('/', getListOfAdmins)
    .get('/logs', getServerLogs)
    .get('/logs/:fileName', getServerLogs)
    .delete('/', deleteAdmin)
    .post('/approve', approveAdmin)
    .post('/groups', adminGroups)
    .post('/groups/add', addAdminGroups)
    .post('/groups/delete', deleteAdminGroups)
    .get('/groups/count', countAdminGroups)