// required
require('dotenv').config()
const express = require('express')
const app = express()

// Cookie parsing middleware
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// include cors
const cors = require('cors')
const corsOptions = {
    // origin: `http://localhost:3000`,
    // origin: `http://61c77c78.ngrok.io`,
    origin: `https://www.mdchem.app`,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}
app.use(cors(corsOptions))

// include body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// include routes
const routes = require('./apis/index')
app.use('/api', routes)

// include static folder
const path = require('path')
app.use('/media', express.static(path.join(__dirname, '/views/build')))

// Webpage middleware
const WebPage = require('./middleware/WebPage')
app.use(WebPage);

module.exports = app