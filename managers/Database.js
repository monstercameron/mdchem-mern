const mongoose = require('mongoose')
const settings = require('../settings')

mongoose.connect(settings.database, {useNewUrlParser: true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`connected to database`)
});

module.exports = db