'use strict'

// npm modules
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = Promise
// mongoose.connect(process.env.MONGODB_URI)

const app = express()

// middelware
app.use(morgan('dev'))
app.use(cors())

app.all('/api/*', (req, res) => res.sendStatus(404))

const server = module.exports = {}

server.isOn = false

server.start = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true
        console.log(`server is up on port ${process.env.PORT}`)
        resolve()
      })
      return
    }
    reject(new Error('server is already running'))
  })
}

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (server.http && server.isOn) {
      server.http.close(() => {
        server.isOn = false
        console.log('server down')
        resolve()
      })
      return
    }
    reject(new Error('the server is not running'))
  })
}
