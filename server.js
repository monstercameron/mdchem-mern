const app = require('./app')

// cron service
const service = require('./services/chron')

// include logger
const logger = require('./services/services/Logger')
app.use(logger.logFile)
app.use(logger.dev)

// start server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port:${process.env.PORT}`)
});