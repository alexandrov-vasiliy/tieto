const http = require('http')
const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const cors = require('cors')


const port = 3000

app.use(bodyParse.json())
app.use(cors({
    origin: '*'
}))

app.get('/query/data/:id/param/:param', (req, res) => {
    
    res.status(200).json([null, {v: 1}, {v: 4}, null])
});

app.post('/requestDone', (req, res) => {
    res.json('Data recived')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})