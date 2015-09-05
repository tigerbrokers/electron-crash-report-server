'use strict'

const config = require('./config')
const createElement = require('virtual-dom/create-element')
const h = require('virtual-dom/h')

function render () {
  function checkbox (id) {
    if (config[id].enabled) {
      return h('input', {
        name: `${id}_enabled`,
        type: 'checkbox',
        checked: 'checked'
      })
    } else {
      return h('input', {
        name: `${id}_enabled`,
        type: 'checkbox'
      })
    }
  }

  return h('html', [
    h('title', 'Crash Report'),
    h('meta', { charset: 'utf-8' }),
    h('meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }),
    h('link', { rel: 'stylesheet', href: 'style.css' }),
    h('h1', 'config'),
    h('p', 'You must restart the server before changes will take effect'),
    h('form', { method: 'post' }, [
      h('div', [
        h('label', 'port'),
        h('input', { name: 'port', value: config.port })
      ]),
      h('h2', 'web'),
      h('div', [
        h('label', ['enabled', checkbox('web')])
      ]),
      h('div', [
        h('label', 'username'),
        h('input', {
          name: 'web_user',
          type: 'text',
          value: config.web.user
        })
      ]),
      h('div', [
        h('label', 'password'),
        h('input', {
          name: 'web_pass',
          type: 'password',
          value: config.web.pass
        })
      ]),
      h('h2', 'email'),
      h('div', [
        h('label', ['enabled', checkbox('email')])
      ]),
      h('div', [
        h('label', 'subject'),
        h('input', {
          name: 'email_subject',
          type: 'text',
          value: config.email.subject
        })
      ]),
      h('div', [
        h('label', 'from'),
        h('input', {
          name: 'email_from',
          type: 'email',
          value: config.email.from
        })
      ]),
      h('div', [
        h('label', 'to'),
        h('input', {
          name: 'email_to',
          type: 'email',
          value: config.email.to
        })
      ]),
      h('div', [
        h('label', 'provider'),
        h('input', {
          name: 'email_provider',
          type: 'text',
          value: config.email.provider
        }),
        h('.hint', h('a', {
          href: 'http://git.io/vGbpu',
          target: '_blank'
        }, 'view list of providers'))
      ]),
      h('div', [
        h('label', 'username'),
        h('input', {
          name: 'email_user',
          type: 'text',
          value: config.email.user
        })
      ]),
      h('div', [
        h('label', 'password'),
        h('input', {
          name: 'email_pass',
          type: 'password',
          value: config.email.pass
        })
      ]),
      h('button', { type: 'submit' }, [
        h('img', { src: 'check.svg' }),
        'save changes'
      ])
    ])
  ])
}

module.exports = function viewCrashReport (req, res) {
  const tree = render(config)
  const vdom = createElement(tree)
  const html = `<!DOCTYPE html>${vdom.toString()}`
  res.set('Content-Type', 'text/html')
  res.send(html)
}
