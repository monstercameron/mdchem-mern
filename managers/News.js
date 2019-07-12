const db = require('../managers/Database')
const Feed = require('../models/schemas/news')
const create = class {
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
const read = class {
    constructor(res, body){
        this.res = res
        this.body = body
        this.run()
    }
    run = () => {
        this.query()
    }

    query = () => {
        const news = db.model('news', Feed, 'news')
        news.find({}, (err, docs) => {
            console.log(docs)
            this.res.json(docs)
        })
    }
}
const update = class {
    constructor(res, body){
        this.res = res
        this.body = body
        this.run()
    }
    run = () =>{
        this.findAndUpdate()
    }
    findAndUpdate = () => {
        const news = db.model('news', Feed, 'news')
        news.findById(this.body.id, (err, model) => {
            if (err) throw err
            console.log(`+++ item found`)
            model.updateOne({message:this.body.message}, () => {
                this.res.json({message:`${this.body.id} was updated`})
            })
        })
    }
}
const deletion = class {
    constructor(res, body){
        this.res = res
        this.body    = body
        this.run()
    }
    run = () =>{
        this.findAndDelete()
    }
    findAndDelete = () => {
        const news = db.model('news', Feed, 'news')
        news.findByIdAndDelete(this.body.id, (err, model) => {
            console.log(`+++ item deleted`)
            this.res.json({message:`${this.body.id} was deleted`})
        })
    }
}
module.exports = {
    create: create,
    read: read,
    update: update,
    deletion: deletion
}