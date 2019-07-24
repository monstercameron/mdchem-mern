/**
 * Database Manager
 */
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_TEST_CONN, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`Connected to database ${process.env.MONGO_TEST_CONN}`)
});
module.exports = db