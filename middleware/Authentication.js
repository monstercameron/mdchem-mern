/**
 * Auth Middleware
 */
const { verifyToken } = require('../managers/Authentication')
const isAuthenticatedAdmin = (req, res, next) => {
    verifyToken(req.headers.authorization)
        .then(decoded => {
            if (decoded.role === 'admin') next()
            else res.status(401).json({ message: `Unauthorized.` })
        })
        .catch(err => res.status(401).json({ message: `Unauthorized`, err }))
}
const isAuthenticatedStudent = (req, res, next) => {
    verifyToken(req.headers.authorization)
        .then(decoded => {
            if (decoded.role === 'student' || decoded.role === 'admin') next()
            else res.status(401).json({ message: `Unauthorized.` })
        })
        .catch(err => res.status(401).json(err))
}
module.exports = {
    isAuthAdmin: isAuthenticatedAdmin,
    isAuthStudent: isAuthenticatedStudent
}