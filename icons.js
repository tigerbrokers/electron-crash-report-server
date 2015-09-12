'use strict'

const fs = require('fs')
const path = require('path')
const assetsPath = path.join(__dirname, 'assets')
const deleteIcon = path.join(assetsPath, 'x.svg')
const downloadIcon = path.join(assetsPath, 'data-transfer-download.svg')
const saveIcon = path.join(assetsPath, 'check.svg')

exports.delete = fs.readFileSync(deleteIcon).toString()
exports.download = fs.readFileSync(downloadIcon).toString()
exports.save = fs.readFileSync(saveIcon).toString()
