'use strict'

const electron = require('electron')
const {app, BrowserWindow, Tray, ipcMain, globalShortcut, clipboard} = electron
const isURL = require('is-valid-http-url')
const path = require('path')
const url = require('url')
const autoUpdater = require('electron-updater').autoUpdater
let mainWindow, tray

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2) - 36)
  const y = Math.round(trayBounds.y + trayBounds.height)
  return {x: x, y: y}
}

function createWindow () {
  tray = new Tray(path.join(__dirname, './app/images/tray-iconTemplate.png'))
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

function createKeyboardShortcut() {
  const ret = globalShortcut.register('Shift+Command+V', () => {
    const clips = clipboard.readText('selection')
    if (isURL(clips)) {
      mainWindow.show()
      mainWindow.webContents.send('info' , {msg:'hello from main process'});
    } else {
      return false;
    }
  })

  if (!ret) {
    console.log('registration failed')
  }
}

app.dock.hide()
app.on('ready', function () {
  createWindow()
  createKeyboardShortcut()
})
app.on('window-all-closed', function () { app.quit() })
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregister('Shift+Command+V')
  globalShortcut.unregisterAll()
})

ipcMain.on('de-activated', () => {
  mainWindow.hide()
})

ipcMain.on('activated', () => {
  mainWindow.show()
})

ipcMain.on('close-me', (evt, arg) => {
  app.quit()
})