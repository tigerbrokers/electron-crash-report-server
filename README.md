[`electron-crash-report-server`][git-repo] is a server for
collecting crash reports from your Electron based
application.

## usage

1. [Download the latest version][latest], unpack it and
   `cd /unpacked/path`

2. Copy or move `config-sample.ini` to `config.ini`

3. Run `npm install` and `npm start`

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
enabling email). Disabling `web` will remove the ability
to view reports online.

With `web` enabled the `config.ini` file is editable online
at <http://domain.tld:1127/config>. Changes made to the
config through either the web or `config.ini` directly
require a server restart before changes take effect.

**Note** that you need to start the `crashReporter` in both
the main and renderer processes if you wish to generate
reports from both.

## bugs & features
Please [create an issue][issues] if you encounter bugs or
missing features.

## license
[MIT license][license]

[git-repo]: http://git.io/vGxTg
[issues]: http://git.io/vGxt1
[latest]: http://git.io/vGxTY
[license]: http://git.io/vGxmf
[sample-config]: http://git.io/vGbHg
