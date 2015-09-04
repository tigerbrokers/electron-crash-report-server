'use strict'

const authorize = require('./authorize')
const config = require('./config')
const downloadDumpFile = require('./download-dump-file')
const express = require('express')
const fs = require('fs')
const listCrashReports = require('./list-crash-reports')
const saveCrashReport = require('./save-crash-report')
const viewCrashReport = require('./view-crash-report')

fs.accessSync('.', fs.W_OK)
fs.accessSync('config.ini', fs.R_OK)

const app = express()
const server = app.listen(config.port, function () {
  const addr = server.address().address
  const port = server.address().port
  console.log(`crash report server running at http://${addr}:${port}`)
})

app.set('trust proxy', true)

app.use(express.static('public'))

app.post('/', saveCrashReport)

if (config.web.enabled) {
  app.get('/', authorize, listCrashReports)
  app.get('/:id', authorize, viewCrashReport)
  app.get('/:id/:attachment', authorize, downloadDumpFile)
}
