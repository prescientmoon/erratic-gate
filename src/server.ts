import express, { static as _static } from 'express'
import { resolve } from 'path'

// create express app
const app = express()

// serve static assets
app.use(_static(__dirname))

// serve single page application
app.get('*', (rex, res) => {
    res.sendFile(resolve(__dirname, 'index.html'))
})

// listen to the port from .env (default to 8080)
app.listen(process.env.PORT || 8080)
