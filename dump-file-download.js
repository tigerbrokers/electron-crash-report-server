'use strict'

const db = require('./db')

module.exports = function downloadDumpFile (req, res) {
  db.getAttachment(req.params.id, req.params.attachment).then(function (bfr) {
    res.send(bfr)
  }).catch(function (err) {
    res.status(err.status).send(err.message)
  })
}
