'use strict'

const _ = require('lodash')
const db = require('./db')
const fs = require('fs')
const multiparty = require('multiparty')

module.exports = function saveCrashReport (req, res) {
  const form = new multiparty.Form()

  form.parse(req, function (err, fields, files) {
    if (err) return console.error(err)

    const doc = {}
    const file = _.first(files.upload_file_minidump)

    for (let key in fields) {
      const value = _.first(fields[key]).trim()
      if (key === '_version') doc.version = value
      else if (key === 'list_annotations') doc.error = value
      else if (key === 'ver') doc.electron_version = value
      else doc[key] = value
    }

    // remove unnecessary info
    delete doc._companyName
    delete doc._productName
    delete doc.prod

    // couchdb does not permit _key named keys
    for (let key in doc) {
      if (key.match(/^_/)) {
        const k = key.replace(/^_/, '')
        doc[k] = doc[key]
        delete doc[key]
      }
    }

    doc._id = new Date().toISOString()
    doc._attachments = {}
    doc._attachments[file.originalFilename] = {
      content_type: 'application/x-dmp',
      data: fs.readFileSync(file.path)
    }

    db.put(doc).then(function () {
      res.send('thanks!')
    }).catch(function (err) {
      console.error(err)
    })
  })
}
