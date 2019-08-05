/**
 * Encryption Manager
 */
const bcrypt = require('bcrypt')
class Hash {
    constructor(passwordText, callback) {
        this.getHash(passwordText, callback)
    }
    getHash = (password, callback) => {
        bcrypt.genSalt(parseInt(process.env.TOKEN_SALT_ROUNDS), function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                console.log(hash)
                callback(hash)
            });
        });
    }
}
class Compare {
    constructor(password, hash, callback) {
        this.password = password
        this.hash = hash
        this.callback = callback
        this.run()
    }
    run = () => {
        this.compare()
    }
    compare = () => {
        bcrypt.compare(this.password, this.hash, (err, res) => {
            if (err) throw err
            // res == true
            this.callback(res)
        });
    }
}
module.exports = {
    Hash: Hash,
    Compare: Compare
}
