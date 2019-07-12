const bcrypt = require('bcrypt')
const saltRounds = 10;

class Hash {
    constructor(passwordText, callback) {
        this.getHash(passwordText, callback)
    }
    getHash = (password, callback) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                callback(hash)
            });
        });
    }
}


class Compare {
    constructor(res, body, hash, callback) {
        this.compare(res, body.password, hash, callback)
    }
    compare = (res, password, hash, callback) => {
        bcrypt.compare(password, hash, function (err, res) {
            // res == true
            callback(res)
        });
    }
}

module.exports = {
    Hash: Hash,
    Compare: Compare
}