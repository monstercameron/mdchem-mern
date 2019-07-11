/**
 * Include services to run
 */
const highScoreService = require('./services/Highscore')

/**
 * Run services hourly
 */
const cron = require('node-cron')
cron.schedule("*/59 * * * *", function() {
    console.log("Hourly Cron task");
    new highScoreService()
  });
module.exports = cron