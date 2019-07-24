/**
 * Database Manager
 */
const mongoose = require('mongoose')
const DBURL = process.env.NODE_ENV === 'development' ? process.env.MONGO_TEST_CONN : process.env.MONGO_LOCAL_CONN
mongoose.connect(DBURL, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`Connected to database ${DBURL}`)
});
module.exports = db