'use strict'

const basicAuth = require('basic-auth')
const config = require('./config')

module.exports = function authorize (req, res, next) {
  const user = basicAuth(req)

  if (!user || !user.name || !user.pass) return unauthorized(res)
  if (authorized(user)) return next()
  else return unauthorized(res)

  function authorized (user) {
    return user.name === config.web.user && user.pass === config.web.pass
  }

  function unauthorized (res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization required')
    return res.sendStatus(401)
  }
}
