const { allData } = require('../../managers/Query')
module.exports = class HighScoreUpdate {
    constructor() {
        this.update()
    }
    update = () => {
        new allData((students) => {
            students.forEach(student => {
                console.log(student)
                let score = 0
                for(let key of Object.keys(student.data)){
                    console.log(student.data[key].score)
                    score+=student.data[key].score
                }
                student.updateOne({score:score}, () => {
                    console.log('updated!')
                })
            });
        })
    }
}