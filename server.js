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
app.use('/api', routes)

// include static folder
const path = require('path')
app.use('/media',express.static(path.join(__dirname, '/views/build')))

// Webpage Router
const WebPage = require('./middleware/WebPage')
app.use(WebPage);

// start server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port:${process.env.PORT}`)
});
