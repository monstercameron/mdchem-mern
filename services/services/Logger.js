/**
 * Logging Manager
 */
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: `logs`
})
module.exports = {
    logFile: morgan('combined', {
        stream: accessLogStream
    }),
    dev: morgan('dev')
}