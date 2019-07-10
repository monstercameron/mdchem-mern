//https://usefulangle.com/post/115/nodejs-cron-job

const cron = require('node-cron')
cron.schedule("1 * * * *", function() {
    console.log("running a task every minute");
  });
module.exports = cron