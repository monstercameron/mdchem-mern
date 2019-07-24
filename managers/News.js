/**
 * News Feed Manager
 */
const db = require('../managers/Database')
const Feed = require('../models/schemas/news')
const create = class {
    constructor(req, res) {
        this.res = res
        this.body = res.body
        this.run()
    }
    run = () => {
        this.build()
        //this.validate()
        this.save()
    }
    build = () => {
        const news = db.model('news', Feed, 'news')
        this._news = new news({
            date: this.body.date,
            sender: this.body.sender,
            message: this.body.message
        })
    }
    validate = () => {
    }
    save = () => {
        this._news.save((err, model) => {
            if (err) throw err
            //console.log(model)
            this.res.json({ result: { message: `news item saved` } })
        })
    }
}
const read = class {
    constructor(req, res) {
        this.res = res
        this.body = res.body
        this.run()
    }
    run = () => {
        this.query()
    }

    query = () => {
        const news = db.model('news', Feed, 'news')
        news.find({}, (err, docs) => {
            //  console.log(docs)
            this.res.json({ resuls: docs })
        })
    }
}
const update = class {
    constructor(req, res) {
        this.res = res
        this.body = res.body
        this.run()
    }
    run = () => {
        this.findAndUpdate()
    }
    findAndUpdate = () => {
        const news = db.model('news', Feed, 'news')
        news.findById(this.body.id, (err, model) => {
            if (err) throw err
            model.updateOne({ message: this.body.message }, () => {
                this.res.json({ result: { message: `${this.body.id} was updated` } })
            })
        })
    }
}
const deletion = class {
    constructor(req, res) {
        this.res = res
        this.body = res.body
        this.run()
    }
    run = () => {
        this.findAndDelete()
    }
    findAndDelete = () => {
        const news = db.model('news', Feed, 'news')
        news.findByIdAndDelete(this.body.id, (err, model) => {
            this.res.json({ result: { message: `${this.body.id} was deleted` } })
        })
    }
}
module.exports = {
    create: create,
    read: read,
    update: update,
    deletion: deletion
}