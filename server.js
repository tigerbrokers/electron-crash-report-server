'use strict'

require('dotenv').config()

const Boom = require('boom')
const Hapi = require('hapi')
const db = require('./db.js')

const port = process.env.PORT
const server = new Hapi.Server()

server.connection({port})

server.route({
  method: 'POST',
  path: '/',
  handler: (request, reply) => {
    if (request.payload && request.payload.prod === 'Electron') {
      const payload = Object.assign({}, request.payload)
      const file = payload.upload_file_minidump

      delete payload.upload_file_minidump

      db.reports.saveDoc(payload, (err, report) => {
        if (err) throw err

        db.dumps.insert({file, report_id: report.id}, (err, dump) => {
          if (err) throw err

          reply()
        })
      })
    } else {
      const error = Boom.badRequest()

      reply(error)
    }
  }
})

server.start(err => {
  if (err) throw err

  console.log(`Server running at: ${server.info.uri}`)
})
