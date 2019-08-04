/**
 * Query helpers
 */
const db = require('../managers/Database')
const Stats = require('../models/schemas/stats')
class AverageScore {
    constructor(req, res) {
        this.req = req
        this.res = res
        this.run()
    }
    run = () => {
        this.query()
    }
    query = () => {
        const stats = db.model('stats', Stat)
        stats.findOne({}, (err, res) => {
            console.log(err, res)
            if (err) return this.res.status(400).json({
                results: {
                    message: err
                }
            })
            this.res.status(200).json({
                results: {
                    average: res.average
                }
            })
        })
    }
}
module.exports = {
    averageScore: AverageScore
}