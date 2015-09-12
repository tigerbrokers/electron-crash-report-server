'use strict'

const fs = require('fs')
const h = require('virtual-dom/h')
const path = require('path')
const css = fs.readFileSync(path.join(__dirname, 'assets', 'style.css'))

module.exports = function () {
  return [
    h('title', 'Crash Reports'),
    h('meta', { charset: 'utf-8' }),
    h('meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }),
    h('style', css.toString())
  ]
}
