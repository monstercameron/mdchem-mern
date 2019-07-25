/**
 * Auth Middleware
 */
const { verifyToken } = require('../managers/Authentication')
const isAuthenticatedAdmin = (req, res, next) => {
    verifyToken(req.cookies.headers)
        .then(decoded => {
            if (decoded.role === 'admin') next()
            else res.status(401).json({ message: `Unauthorized.` })
        })
        .catch(err => res.status(401).json({ results: { message: `Unauthorized`, error: err } }))
}
const isAuthenticatedStudent = (req, res, next) => {
    verifyToken(req.headers.authorization)
        .then(decoded => {
            if (decoded.role === 'student' || decoded.role === 'admin') next()
            else res.status(401).json({ result: { message: `Unauthorized.` } })
        })
        .catch(err => res.status(401).json({ result: { error: err } }))
}
module.exports = {
    isAuthAdmin: isAuthenticatedAdmin,
    isAuthStudent: isAuthenticatedStudent
}