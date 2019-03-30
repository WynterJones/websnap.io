'use strict'

const electron = require('electron')
const {app, Menu, BrowserWindow, Tray, nativeImage, ipcMain} = electron
const fs = require('fs')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const autoUpdater = require('electron-updater').autoUpdater
require('dotenv').config()
require('electron-context-menu')({})
let mainWindow, tray

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height)
  return {x: x, y: y}
}

function createWindow () {
  const iconPath = path.join(__dirname, './tray-icon-white.png')
  let trayIcon = nativeImage.createFromPath(iconPath)
  trayIcon = trayIcon.resize({ width: 16, height: 16 })
  tray = new Tray(trayIcon)
  mainWindow = new BrowserWindow({width: 600, height: 80, transparent: true, frame: false, resizable: false })
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

  mainWindow.webContents.openDevTools({mode: 'detach'})

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  var template = [{
  label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.dock.hide()

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('de-activated', () => {
  mainWindow.hide()
})

