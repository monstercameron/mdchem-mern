/**
 * @name Encryption Manager
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
/**
 * @name Hash
 * @param {string} password - user password to hash
 * @returns - hashed password
 */
const hash = async ({
    password
}) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.TOKEN_SALT_ROUNDS))
    return bcrypt.hash(password, salt)
}
/**
 * @name Compare
 * @param {string} password - user password plain text
 * @param {string} hash - user password hash
 */
const compare = async ({
    password,
    hash
}) => {
    const result = await bcrypt.compare(password, hash)
    return new Promise((resolve, reject) => {
        result ? resolve(result) : reject(new Error(`Password doesn't match stored value`))
    })
}
module.exports = {
    Hash: Hash,
    hash,
    Compare: Compare,
    compare
}