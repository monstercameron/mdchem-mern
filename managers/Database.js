/**
 * Database Manager
 */
const mongoose = require('mongoose')
let DBURL
switch (process.env.NODE_ENV) {
  case 'development':
    DBURL = process.env.MONGO_DEV_CONN
    break
  case 'test':
    DBURL = process.env.MONGO_TEST_CONN
    break
  default:
    DBURL = process.env.MONGO_LIVE_CONN
}
mongoose.connect(DBURL, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`Connected to database ${DBURL}`)
})
module.exports = {
  db: db,
  con: DBURL.split('/')[3]
}