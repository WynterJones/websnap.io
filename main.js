'use strict'

const electron = require('electron')
const {app, BrowserWindow, Tray, ipcMain, globalShortcut, clipboard} = electron
const isURL = require('is-valid-http-url')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const { autoUpdater } = require("electron-updater")
let mainWindow, tray

app.dock.hide()
app.on('window-all-closed', function () { app.quit() })
app.on('activate', function () { if (mainWindow === null) { createWindow() } })
app.on('ready', function () {
  createWindow()
  createKeyboardShortcut()
  autoUpdater.checkForUpdatesAndNotify()
})
app.on('will-quit', () => {
  globalShortcut.unregister('Shift+Command+V')
  globalShortcut.unregisterAll()
})

ipcMain.on('de-activated', () => { mainWindow.hide() })
ipcMain.on('activated', () => { mainWindow.show() })

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2) - 36)
  const y = Math.round(trayBounds.y + trayBounds.height)
  return {x: x, y: y}
}

function createWindow () {
  tray = new Tray(path.join(__dirname, './app/tray-iconTemplate.png'))
  mainWindow = new BrowserWindow({
    width: 400,
    height: 110,
    transparent: true,
    frame: false,
    show: true,
    resizable: false,
    alwaysOnTop: true
  })
  
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

  mainWindow.on('show', () => { tray.setHighlightMode('always') })
  mainWindow.on('hide', () => { tray.setHighlightMode('never') })
  mainWindow.on('closed', function () { mainWindow = null })

  if (isDev) {
    mainWindow.webContents.openDevTools({mode: 'detach'})
  }
}

function createKeyboardShortcut() {
  const ret = globalShortcut.register('Shift+Command+V', () => {
    const clips = clipboard.readText('selection')
    if (isURL(clips)) {
      mainWindow.webContents.send('detectKeyboardShortcut')
    } else {
      return false
    }
  })
  if (!ret) { console.log('registration failed') }
}