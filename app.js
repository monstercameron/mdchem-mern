// required
require('dotenv').config()
const express = require('express')
const app = express()

// Cookie parsing middleware
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// include cors
const cors = require('cors')
//app.use(cors())
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "https://www.mdchem.app") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

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