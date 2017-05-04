const Mixpanel = require('mixpanel')
const mixpanel = Mixpanel.init(process.env.API_KEY, {
  protocol: 'https'
})

module.exports = mixpanel
