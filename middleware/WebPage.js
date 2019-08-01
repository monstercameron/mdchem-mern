/**
 * Webpage Middleware
 */
const path = require('path')
const isWebPageRequest = (req, res, next) => {
    if (req.url.includes('api') || req.url.includes('media')) {
        next()
    } else {
        res.sendFile(path.join(__dirname, '../views/build/index.html'))
    }
}
module.exports = isWebPageRequest