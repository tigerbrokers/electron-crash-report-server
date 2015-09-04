'use strict'

const PouchDB = require('pouchdb')
const db = new PouchDB('crash-reports', { auto_compaction: true })

module.exports = db
