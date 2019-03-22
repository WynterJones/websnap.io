<img src="https://github.com/MonetizeDesignTeam/electron-spark/blob/master/app/images/electron-spark-logo.png?raw=true" style="width: 150px;" />

# Electron Spark ⚡
#### Version: 0.0.3

Electron-Spark is a modified version of the original `electron-quick-start` modified to fit the conventions used by MonetizeDesign which are similar to that of Ruby on Rails.

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `app/application.html` - A web page to render. This is the app's **renderer process**.
- `app/renderer.js` - This is the JavaScript that runs with the `appliation.html`
- `app/images` - Your images
- `app/stylesheets` - Your CSS stylesheets
- `app/javascripts` - All the JS files used in the app

## How To Run 🤯

Run `npm install` and then run `npm start`

If you have no idea what to do from here... Check out the links below :)

## How to Use "Views"

The views folder in the `app` directory is for HTML files that are loaded via NodeJS like so:

`const example_view = fs.readFileSync(path.join(__dirname, 'views/example.html'), 'utf8')`

This is optional incase you are making a SPA (single page application) in Electron.

## Run Tests 😓

You can add new files inside of `collections` which can be used for `describe` tests in Spectron using Mocha, Chai and Web Driver.

Run `npm run test` to test your app.

## CircleCi 😏

All of the dot files for CircleCi are added to this repo, you can change it as needed.

## StandardJS with Hound & ESLint 🧐

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

**StandardJS** is setup for this package with everything needed to properly check for code style. Also includes the `.hound.yml` file if you are using Hound.

## Scripts 😎

 - **npm run start** : `electron .`
 - **npm run test** : `export MOCHA=true; DEBUG=true mocha tests --no-timeouts --bail; unset MOCHA`
 - **npm run build** : `electron-builder`
 - **npm run release** : `build`
 - **npm run readme** : `node ./node_modules/.bin/node-readme`

## Dependencies 🤠

Package | Version | Dev
--- |:---:|:---:
[capitalize](https://www.npmjs.com/package/capitalize) | ^1.0.0 | ✖
[dotenv](https://www.npmjs.com/package/dotenv) | ^5.0.1 | ✖
[electron-context-menu](https://www.npmjs.com/package/electron-context-menu) | ^0.9.1 | ✖
[electron-drag](https://www.npmjs.com/package/electron-drag) | ^1.2.0 | ✖
[electron-is-dev](https://www.npmjs.com/package/electron-is-dev) | ^0.3.0 | ✖
[electron-store](https://www.npmjs.com/package/electron-store) | ^1.3.0 | ✖
[electron-updater](https://www.npmjs.com/package/electron-updater) | ^2.21.4 | ✖
[jquery](https://www.npmjs.com/package/jquery) | ^3.3.1 | ✖
[moment](https://www.npmjs.com/package/moment) | ^2.22.0 | ✖
[mousetrap](https://www.npmjs.com/package/mousetrap) | ^1.6.1 | ✖
[numeral](https://www.npmjs.com/package/numeral) | ^2.0.6 | ✖
[perfy](https://www.npmjs.com/package/perfy) | ^1.1.2 | ✖
[pluralize](https://www.npmjs.com/package/pluralize) | ^7.0.0 | ✖
[chai](https://www.npmjs.com/package/chai) | ^4.1.2 | ✔
[devtron](https://www.npmjs.com/package/devtron) | ^1.4.0 | ✔
[electron](https://www.npmjs.com/package/electron) | 2.0.0-beta.7 | ✔
[electron-builder](https://www.npmjs.com/package/electron-builder) | ^20.8.1 | ✔
[electron-publisher-s3](https://www.npmjs.com/package/electron-publisher-s3) | ^20.8.1 | ✔
[electron-rebuild](https://www.npmjs.com/package/electron-rebuild) | ^1.7.3 | ✔
[eslint](https://www.npmjs.com/package/eslint) | ^4.19.1 | ✔
[eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard) | ^11.0.0 | ✔
[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | ^2.11.0 | ✔
[eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node) | ^6.0.1 | ✔
[eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise) | ^3.7.0 | ✔
[eslint-plugin-standard](https://www.npmjs.com/package/eslint-plugin-standard) | ^3.0.1 | ✔
[mocha](https://www.npmjs.com/package/mocha) | ^5.1.0 | ✔
[mocha-junit-reporter](https://www.npmjs.com/package/mocha-junit-reporter) | ^1.17.0 | ✔
[mocha-multi-reporters](https://www.npmjs.com/package/mocha-multi-reporters) | ^1.1.7 | ✔
[mocha-reporter](https://www.npmjs.com/package/mocha-reporter) | ^0.1.1 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | ^0.1.9 | ✔
[spectron](https://www.npmjs.com/package/spectron) | ^3.8.0 | ✔
[standard](https://www.npmjs.com/package/standard) | ^11.0.1 | ✔


## Resources for Learning Electron 🤓

- [electron-awesome-lists](https://github.com/MonetizeDesignTeam/awesome-web-developer-list) - Awesome Electron and Web Dev List
- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs


## License 🤑

[CC0 1.0 (Public Domain)](LICENSE.md)
