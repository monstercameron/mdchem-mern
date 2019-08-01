const express = require('express')
const router = express.Router()
const db = require('../managers/Database')
const schemas = require('../models/index')

router
    .get('/', (req, res) => {
        console.log(req.query)
        const user = db.model('user', schemas.user.model, 'test');
        const aUser = new user({
            fname: req.query.fname,
            lname: req.query.lname,
            has: {
                car: true
            }
        })
        //console.log(aUser)
        aUser.save((err, model) => {
            if (err) throw err
            console.log(model)
            res.send(`res`)
        })
        // res.send('res')
    })
    .post('/', (req, res) => {
        res.send('auth route')
    })

router
    .get('/search', (req, res) => {
        const {
            fname,
            lname,
            all
        } = req.query
        let user = db.model('user', schemas.user.model, 'test');
        user.find(all ? {} : {
            has: {
                car: true
            }
        }, (err, docs) => {
            console.log(docs)
            docs.length > 0 ? res.json(docs) : res.json({
                message: `no users found with first name: ${fname}`
            })
        })
    })

module.exports = router