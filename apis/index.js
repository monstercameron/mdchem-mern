/**
 * Route Config
 */
const router = require('express').Router()
const {
    isAuthAdmin,
    isAuthStudent
} = require('../middleware/Authentication')
// include routes
const Auth = require('./Authentication')
const Admin = require('./Admin')
const Feed = require('./Feed')
const Msg = require('./Message')
const Player = require('./Player')
const Players = require('./Players')
//const Test = require('./Testing')
router.use('/auth', Auth)
router.use('/admin', /*isAuthAdmin,*/ Admin) // needs to add token checking middle ware
router.use('/feed', isAuthAdmin, Feed)
router.use('/message', isAuthAdmin, Msg)
router.use('/player', isAuthStudent, Player)
router.use('/players', isAuthAdmin, Players)
//router.use('/test', isAuthAdmin, Test)
module.exports = router