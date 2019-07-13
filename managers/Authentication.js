const jwt = require('jsonwebtoken')
const verifyJWTToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) return reject(err)
            resolve(decodedToken)
        })
    })
}
const createJWTToken = (params) => {
    return new Promise((resolve, reject) => {
        const { options, payload } = params
        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err || !token) return reject(err)
            resolve(token)
        });
    })
}
module.exports = {
    verifyToken: verifyJWTToken,
    createToken: createJWTToken
}