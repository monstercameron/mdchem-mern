const db = require('../managers/Database')
const Feed = require('../models/schemas/news')
module.exports = class News {
    constructor(res, body) {
        this.res = res
        this.body = body
        this.run()
    }
    run = () => {
        this.build()
        this.validate()
        this.save()
    }
    build = () => {
        const news = db.model('news', Feed, 'news')
        this._news = new news({
            date: this.body.date,
            sender: this.body.sender,
            message: this.body.message
        })
        console.log(`+++ news item constructed`)
    }
    validate = () => {
        console.log(`+++ news item not validated`)
    }
    save = () => {
        this._news.save((err, model) => {
            if (err) throw err
            //console.log(model)
            console.log(`+++ news item saved`)
            this.res.json({ message: `news item saved` })
        })             
    }
}