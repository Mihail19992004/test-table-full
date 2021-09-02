const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', require('./route/table.route'))
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.kmv0a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(5000, ()=> {
            console.log('start server')
        })
    } catch (e) {

    }
}
start()