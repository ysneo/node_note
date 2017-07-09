const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db')

const app = express()

const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))



app.listen(port, () => {
    console.log(`live on port: ${port}`);
})

MongoClient.connect(db.url, (error, database) => {
    if (error) return console.log(error)
    require('./app/routes')(app, database)
})