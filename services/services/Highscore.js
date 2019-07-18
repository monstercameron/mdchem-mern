/**
 * Highscore cron job
 * Queries the database, checks all the level data and updates the score
 */
const { allStudentData } = require('../../managers/Student')
module.exports = class HighScoreUpdate {
    constructor() {
        this.update()
    }
    update = () => {
        new allStudentData((students) => {
            console.log(`Updating ${students.length} students highscores`)
            students.forEach(student => {
                //console.log(student)
                let score = 0
                if (student.data) {
                    for (let key of Object.keys(student.data)) {
                        //console.log(student.data[key].score)
                        score += student.data[key].score
                    }
                }
                student.updateOne({ score: score }, () => {
                    //console.log('updated!')
                })
            });
        })
    }
}