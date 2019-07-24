// required
require('dotenv').config()
const express = require('express')
const app = express()

// include cors
const cors = require('cors')
app.use(cors())

// include body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// include routes
const routes = require('./apis/index')
app.use('/api', routes)

// include static folder
const path = require('path')
app.use('/media',express.static(path.join(__dirname, '/views/build')))

// Webpage middleware
const WebPage = require('./middleware/WebPage')
app.use(WebPage);

module.exports = app