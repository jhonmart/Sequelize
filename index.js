const express = require('express')
const Product = require('./routers/product')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/produtos', Product)

app.listen(PORT, function() {
    console.log('listening on *:'+PORT)
})