'use strict'

const electron = require('electron')
const {app, Menu, BrowserWindow, Tray, nativeImage, ipcMain, remote} = electron
const fs = require('fs')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const autoUpdater = require('electron-updater').autoUpdater
let mainWindow, tray


// disaply security warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2) - 36)
  const y = Math.round(trayBounds.y + trayBounds.height)
  return {x: x, y: y}
}

function createWindow () {
  tray = new Tray(path.join(__dirname, './trayIconTemplate.png'))
  mainWindow = new BrowserWindow({
    width: 400,
    height: 110,
    transparent: true,
    frame: false,
    show: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/application.html'),
    protocol: 'file:',
    slashes: true
  }))

  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)

  // mainWindow.webContents.openDevTools({mode: 'detach'})

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

