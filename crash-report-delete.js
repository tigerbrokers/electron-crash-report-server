'use strict'

const db = require('./db')

module.exports = function deleteCrashReport (req, res) {
  db.get(req.params.id).then(function (doc) {
    db.remove(doc).then(function (response) {
      res.redirect('/')
    }).catch(function (err) {
      res.status(err.status).send(err.message)
    })
  }).catch(function (err) {
    res.status(err.status).send(err.message)
  })
}
