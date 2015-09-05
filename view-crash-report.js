'use strict'

const _ = require('lodash')
const createElement = require('virtual-dom/create-element')
const db = require('./db')
const h = require('virtual-dom/h')

function render (doc) {
  return h('html', [
    h('title', 'Crash Report'),
    h('meta', { charset: 'utf-8' }),
    h('meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }),
    h('link', { rel: 'stylesheet', href: 'style.css' }),
    h('h1', [
      doc._id,
      h('form', { action: `/${doc._id}?_method=DELETE`, method: 'post' }, [
        h('button.destroy', { type: 'submit' }, [
          h('img', { alt: 'delete', src: 'x.svg' }),
          'delete'
        ])
      ])
    ]),
    h('dl', Object.keys(doc).sort().map(function (key) {
      if (!key.match(/(^_|error)/)) return [h('dt', key), h('dd', doc[key])]
    })),
    h('p', [
      h('a', {
        href: `/${doc._id}/${_.first(Object.keys(doc._attachments))}`
      }, 'download dump file')
    ]),
    h('h2', 'error'),
    h('pre', doc.error)
  ])
}

module.exports = function viewCrashReport (req, res) {
  db.get(req.params.id).then(function (doc) {
    const tree = render(doc)
    const vdom = createElement(tree)
    const html = `<!DOCTYPE html>${vdom.toString()}`
    res.set('Content-Type', 'text/html')
    res.send(html)
  }).catch(function (err) {
    res.status(err.status).send(err.message)
  })
}
