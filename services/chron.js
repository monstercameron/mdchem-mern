/**
 * Cron Job Service
 */
const highScoreService = require('./services/Highscore')
const averageScoreService = require('./services/AverageScore')
const cron = require('node-cron')
/**
 * Run services hourly
 */
cron.schedule("*/59 * * * *", function () {
  console.log("Hourly Cron task");
  new highScoreService()
  new averageScoreService()
})
/**
 * Run Service Every Minute dev
 */
// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute')
//   new highScoreService()
//   new averageScoreService()
// })
module.exports = cron