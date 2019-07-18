/**
 * Logging Manager
 */
const morgan = require('morgan')
var rfs = require('rotating-file-stream')
//const accessLogStream = fs.createWriteStream(`./logs/access.log`, { flags: 'a' })
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: `logs`
})
module.exports = {
    logFile:  morgan('combined', { stream: accessLogStream }),
    dev: morgan('dev')
}