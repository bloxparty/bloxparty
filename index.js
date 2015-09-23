'use strict'
const app = require('app')
const BrowserWindow = require('browser-window')

require('electron-debug')()

let mainWindow

function onClosed () {
  mainWindow = null
}

function createMainWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Blox Party'
  })
  win.loadUrl('file://' + __dirname + '/index.html')
  win.on('closed', onClosed)
  return win
}

app.on('window-all-closed', () => {if (process.platform !== 'darwin') app.quit()})
app.on('activate-with-no-open-windows', () => {if (!mainWindow) mainWindow = createMainWindow()})
app.on('ready', () => {mainWindow = createMainWindow()})
