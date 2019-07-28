import express, { static as _static } from 'express'
import { resolve } from 'path'

const app = express()

app.use(_static(__dirname))

app.get('*', (rex, res) => {
    res.sendFile(resolve(__dirname, 'index.html'))
})

app.listen(process.env.PORT || 8080)
