'use strict'

const fs = require('fs')
const ini = require('ini')
const path = require('path')

module.exports = function saveConfig (req, res) {
  if (req.body.web_enabled) req.body.web_enabled = true
  else req.body.web_enabled = false
  if (req.body.email_enabled) req.body.email_enabled = true
  else req.body.email_enabled = false

  const newConfig = {
    port: req.body.port,
    web: {
      enabled: req.body.web_enabled,
      user: req.body.web_user,
      pass: req.body.web_pass
    },
    email: {
      enabled: req.body.email_enabled,
      subject: req.body.email_subject,
      from: req.body.email_from,
      to: req.body.email_to,
      provider: req.body.email_provider,
      user: req.body.email_user,
      pass: req.body.email_pass
    }
  }

  fs.writeFileSync(path.join(__dirname, 'config.ini'), ini.encode(newConfig, { whitespace: true }))
  res.redirect('/config')
}
