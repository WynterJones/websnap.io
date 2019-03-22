'use strict'

const Application = require('spectron').Application
const electronPath = require('electron')
const path = require('path')

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '..')]
})

const collection = require(path.join(__dirname, 'collection-component.js'))

// Copy for More Tests in /tests/collections folder
collection('Example', 'example.js', app)
