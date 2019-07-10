const settings  = require('./settings')
const express = require('express')
const app = express()

const service = require('./services/chron')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const routes = require('./apis/index')
app.use('/', routes)

const server = app.listen(settings.port, () => {
    console.log(`Server Started on port:${settings.port}`)
});