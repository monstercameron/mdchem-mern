// required
const settings = require('./settings')
const express = require('express')
const app = express()

// cron service
const service = require('./services/chron')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// include routes
const routes = require('./apis/index')
app.use('/', routes)

// start server
const server = app.listen(settings.port, () => {
    console.log(`Server Started on port:${settings.port}`)
});