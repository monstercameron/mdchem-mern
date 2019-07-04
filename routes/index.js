let router = require('express').Router()
const Auth = require('./Authentication')
const Test = require('./Testing')

router.use('/auth', Auth)
router.use('/test', Test)

module.exports = router