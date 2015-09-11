'use strict'

const fs = require('fs')
const ini = require('ini')
const path = require('path')
const config = ini.parse(fs.readFileSync(path.join(__dirname, 'config.ini'), 'utf-8'))

module.exports = config
