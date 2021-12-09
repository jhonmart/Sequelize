const express = require('express')
const RouterDB = require('./main')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', RouterDB)

app.listen(PORT, function() {
    console.log('listening on *:'+PORT)
})