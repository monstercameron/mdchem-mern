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
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin: *')
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token')
    next();
});

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