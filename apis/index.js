let router = require('express').Router()
const Auth = require('./Authentication')
const Admin = require('./Admin')
const Feed = require('./Feed')
const Msg = require('./Message')
const Player = require('./Player')
const Players = require('./Players')
const Test = require('./Testing')

router.use('/auth', Auth)
router.use('/admin', Admin)
router.use('/feed', Feed)
router.use('/message', Msg)
router.use('/player', Player)
router.use('/players', Players)
router.use('/test', Test)

module.exports = router