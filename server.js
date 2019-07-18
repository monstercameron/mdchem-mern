// environment setup
const environment = 'development'

// required
require('dotenv').config()
const express = require('express')
const app = express()

// include logger
const logger = require('./services/services/Logger')
app.use(logger.logFile)
app.use(logger.dev)

// include cors
const cors = require('cors')
app.use(cors())

// cron service
const service = require('./services/chron')

// include body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// include routes
const routes = require('./apis/index')
app.use('/', routes)

// start server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port:${process.env.PORT}`)
});