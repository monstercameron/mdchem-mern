const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_LOCAL_CONN, {useNewUrlParser: true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`Connected to database ${process.env.MONGO_LOCAL_CONN}`)
});

module.exports = db