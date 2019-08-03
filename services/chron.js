/**
 * Cron Job Service
 */
const highScoreService = require('./services/Highscore')
const cron = require('node-cron')
/**
 * Run services hourly
 */
cron.schedule("*/59 * * * *", function () {
  console.log("Hourly Cron task");
  new highScoreService()
})
/**
 * Run Service Every Minute dev
 */
cron.schedule('* * * * *', () => {
  console.log('running a task every minute a')
  new highScoreService()
})
module.exports = cron