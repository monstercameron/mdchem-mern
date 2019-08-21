/**
 * Highscore cron job
 * Queries the database, checks all the level data and updates the score
 */
const {
    allStudentData
} = require('../../managers/Student')
const {
    db
} = require('../../managers/Database')
const Stat = require('../../models/schemas/stats')
module.exports = class HighScoreUpdate {
    constructor() {
        this.update()
    }
    update = () => {
        new allStudentData(students => {
            console.log(`Averaging ${students.length} students hichscores`)
            let score = 0
            for (let student of students) {
                score += student.score
            }
            const stat = db.model('stat', Stat)
            stat.findOne({}, (err, res) => {
                if (!res) {
                    const aStat = new stat({
                        average: (score / students.length)
                    })
                    aStat.save((err, model) => {
                        //console.log(`Average Stats updated`)
                    })
                } else {
                    res.average = score / students.length
                    res.save((err, model) => {
                        //console.log(`Average Stats updated`)
                    })
                }
            })
        })
    }
}