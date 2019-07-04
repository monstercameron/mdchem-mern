var express = require('express')
const app = express()
let port = 8080

const routes = require('./routes/index')
app.use('/', routes)

const server = app.listen(port, () => {
    console.log(`Server Started on port:${port}`)
});