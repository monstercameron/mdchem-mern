/**
 * Route Config
 */
const router = require('express').Router()
const {
    isAuthAdmin,
    isAuthStudent
} = require('../middleware/Authentication')
const Auth = require('./Authentication')
const Admin = require('./Admin')
const Feed = require('./Feed')
const Msg = require('./Message')
const Player = require('./Player')
const Players = require('./Players')
router.use('/auth', Auth)
router.use('/admin', isAuthAdmin, Admin)
router.use('/feed', isAuthAdmin, Feed)
router.use('/message', isAuthAdmin, Msg)
router.use('/player', Player)
router.use('/players', Players)
module.exports = router