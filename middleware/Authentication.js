/**
 * Auth Middleware
 */
const {
    verifyToken
} = require('../managers/Authentication')
const isAuthenticatedAdmin = (req, res, next) => {
    verifyToken(req.cookies.token)
        .then(decoded => {
            if (decoded.role === 'admin') {
                res.locals = {
                    ...decoded
                }
                next()
            } else res.status(401).json({
                message: `Unauthorized.`
            })
        })
        .catch(err => res.status(401).json({
            results: {
                message: `Unauthorized`,
                error: err
            }
        }))
}
const isAuthenticatedStudent = (req, res, next) => {
    verifyToken(req.cookies.token)
        .then(decoded => {
            if (decoded.role === 'student' || decoded.role === 'admin') {
                res.locals = {
                    ...decoded
                }
                next()
            } else res.status(401).json({
                result: {
                    message: `Unauthorized.`
                }
            })
        })
        .catch(err => res.status(401).json({
            result: {
                error: err
            }
        }))
}
module.exports = {
    isAuthAdmin: isAuthenticatedAdmin,
    isAuthStudent: isAuthenticatedStudent
}