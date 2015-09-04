'use strict'

const express = require('express')
const fs = require('fs')
const ini = require('ini')
const saveCrashReport = require('./save-crash-report')

fs.accessSync('.', fs.W_OK)
fs.accessSync('config.ini', fs.R_OK)

const app = express()
const config = ini.parse(fs.readFileSync('config.ini', 'utf-8'))
const server = app.listen(config.port, function () {
  const addr = server.address().address
  const port = server.address().port
  console.log(`crash report server running at http://${addr}:${port}`)
})

app.set('trust proxy', true)

app.post('/', saveCrashReport)
