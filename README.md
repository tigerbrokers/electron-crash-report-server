[`electron-crash-report-server`][git-repo] is a server for
collecting crash reports from your Electron based
application.

## usage

1. [Download the latest version][latest], unpack it and
   `cd /unpacked/path`

2. Create a `config.ini` file with your settings; use
   [`config-sample.ini`][sample-config] to get started

3. Run `npm start`

4. Enable crash reports from your application

   ``` javascript
   const crashReporter = require('crash-reporter')
   crashReporter.start({
     submitUrl: 'http://domain.tld:1127/'
   })
   ```

   `submitUrl` is the server running the crash report
   server

5. :bomb: your application

Reports are available at `submitUrl` (or your inbox by
enabling email). Disabling `http` will remove the ability
to view reports online.

**Note** that you need to start the `crashReporter` in both
the main and renderer processes if you wish to generate
reports from both.

[git-repo]: http://git.io/vGxTg
[latest]: http://git.io/vGxTY
[sample-config]: http://git.io/vGbHg
