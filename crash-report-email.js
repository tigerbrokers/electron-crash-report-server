'use strict'

const _ = require('lodash')
const config = require('./config')
const db = require('./db')
const mailer = require('nodemailer')

const transporter = mailer.createTransport({
  service: config.email.provider,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
})

module.exports = function emailCrashReport (id) {
  db.get(id).then(function (doc) {
    const attachment = _.first(Object.keys(doc._attachments))
    const email = {
      from: config.email.from,
      to: config.email.to,
      subject: config.email.subject,
      attachments: [],
      text: `id: ${doc._id}\n`
    }

    Object.keys(doc).sort().forEach(function (key) {
      if (!key.match(/^_/)) email.text += `${key}: ${doc[key]}\n`
    })

    return db.getAttachment(doc._id, attachment).then(function (bfr) {
      email.attachments.push({
        filename: attachment,
        content: bfr
      })
      return email
    }).catch(function (err) {
      console.error(err)
    })
  })
  .then(function (email) {
    transporter.sendMail(email, function (err, info) {
      if (err) console.error(err)
    })
  })
  .catch(function (err) {
    if (err.status !== 404) console.error(err)
  })
}
