/**
 * Highscore cron job
 * Queries the database, checks all the level data and updates the score
 */
const { allData } = require('../../managers/Query')
module.exports = class HighScoreUpdate {
    constructor() {
        this.update()
    }
    update = () => {
        new allData((students) => {
            console.log(`Updating ${students.length} students hichscores`)
            students.forEach(student => {
                //console.log(student)
                let score = 0
                for (let key of Object.keys(student.data)) {
                    //console.log(student.data[key].score)
                    score += student.data[key].score
                }
                student.updateOne({ score: score }, () => {
                    //console.log('updated!')
                })
            });
        })
    }
}