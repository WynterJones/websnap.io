'use strict'

const electron = require('electron')
const {app, Menu, BrowserWindow, Tray, nativeImage, ipcMain} = electron
const fs = require('fs')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const autoUpdater = require('electron-updater').autoUpdater
let mainWindow, tray

require('dotenv').config()
require('electron-context-menu')({})

// disaply security warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2) - 23)
  const y = Math.round(trayBounds.y + trayBounds.height)
  return {x: x, y: y}
}

function createWindow () {
  const iconPath = path.join(__dirname, './tray-icon-white.png')
  let trayIcon = nativeImage.createFromPath(iconPath)
  trayIcon = trayIcon.resize({ width: 16, height: 16 })
  tray = new Tray(trayIcon)
  mainWindow = new BrowserWindow({
    width: 400,
    height: 110,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.hide()
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/application.html'),
    protocol: 'file:',
    slashes: true
  }))

  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.setPosition(position.x, position.y, false)
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })

  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })

  // mainWindow.webContents.openDevTools({mode: 'detach'})

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.dock.hide()
app.on('ready', createWindow)
app.on('window-all-closed', function () { app.quit() })
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('de-activated', () => {
  mainWindow.hide()
})

ipcMain.on('activated', () => {
  mainWindow.show()
})

