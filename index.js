'use strict'
const app = require('app')
const BrowserWindow = require('browser-window')
const Menu = require('menu')
const menuTemplate = require('./menu-template.js')

require('electron-debug')()

let mainWindow = null

function onClosed () {
  mainWindow = null
}

function createMainWindow () {
  const win = new BrowserWindow({
    width: 920,
    height: 600,
    center: true,
    'standard-window': false,
    title: 'Blox Party'
  })
  win.loadUrl('file://' + __dirname + '/index.html')
  win.on('closed', onClosed)
  return win
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate-with-no-open-windows', () => {
  if (!mainWindow) mainWindow = createMainWindow()
})

app.on('ready', () => {
  // Build menu only for OSX
  if (Menu.sendActionToFirstResponder) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
  }
  mainWindow = createMainWindow()
})
