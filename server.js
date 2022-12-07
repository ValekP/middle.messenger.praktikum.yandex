const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT, HOST, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
