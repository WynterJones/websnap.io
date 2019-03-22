'use strict'

const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

let sleep = time => new Promise(resolve => setTimeout(resolve, time))

module.exports = (title, path, app) => {
  describe(title, function () {
    before(function () { return app.start() })
    after(function () { return app.stop() })
    require(`./collections/${path}`)(app, assert, expect, sleep, process.env.TIMEOUT)
  })
}
