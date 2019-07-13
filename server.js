// environment setup
const environment = 'development'

// required
require('dotenv').config()
const express = require('express')
const app = express()

// include logger
const logger = require('morgan')

if (environment !== 'production') {
    app.use(logger('dev'));
}

// cron service
const service = require('./services/chron')

// include body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// include routes
const routes = require('./apis/index')
app.use('/', routes)

// include jwt token middleware
const {
    tokenKey
} = require('./settings')

// start server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port:${process.env.PORT}`)
});