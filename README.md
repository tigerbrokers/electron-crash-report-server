**electron-crash-report-server** is a server for collecting crash reports from
Electron applications.

## install
[![Deploy][deploy-img]][deploy-url]

During setup you should change the `AUTH_USER` and `AUTH_PASS` environment
variables. Once your app has been deployed you will use those values to login.

If you are not seeing crash reports after the first deploy you may  need to
restart the app.

## usage
~~~ javascript
const {crashReporter} = require('electron')
crashReporter.start({
  // ...other options
  submitURL: 'https://app-name-12345.herokuapp.com/'
})
~~~

Refer to the [`crashReporter`][docs] documentation for the full details.

Check out the [example electron app][example] and [demo server][demo] for a
working example. The login and password for the demo are `crash` and `electron`.

You may need to use the example (or any other) app to add some reports to the
demo server.

## bugs & features
Please [create an issue][issues] if you encounter bugs or
missing features.

## license
[MIT license][license]

[deploy-img]: https://www.herokucdn.com/deploy/button.svg
[deploy-url]: https://heroku.com/deploy?template=https://github.com/johnmuhl/electron-crash-report-server/tree/pg-17
[docs]: http://electron.atom.io/docs/api/crash-reporter/
[example]: https://github.com/johnmuhl/electron-crash-report-server/tree/master/electron-bomb
[demo]: https://pacific-falls-32011.herokuapp.com/
[issues]: https://github.com/johnmuhl/electron-crash-report-server/issues
[license]: https://github.com/johnmuhl/electron-crash-report-server/blob/master/LICENSE
