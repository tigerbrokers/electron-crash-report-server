A server for collecting crash reports from your Electron
based application.

## usage

1. Create a `config.ini` file with your settings; use
   [`config-sample.ini`][sample-config] to get started
2. Run `npm start`
3. Enable crash reports from your application; `submitUrl`
   is the server running the crash report server
   ``` javascript
   const crashReporter = require('crash-reporter')
   crashReporter.start({
     submitUrl: 'http://domain.tld:1127/'
   })
   ```
4. :bomb: your application

Reports are available at `submitUrl` (or your inbox by
enabling email). Disabling `http` will remove the ability
to view reports online.

**Note** that you need to start the `crashReporter` in both
the main and renderer processes if you wish to generate
reports from both.

[sample-config]: http://git.io/vGbHg
