'use strict'
const app = require('app')
const BrowserWindow = require('browser-window')
const Menu = require('menu')
const appName = app.getName()

require('electron-debug')()

let mainWindow = null

let menuTemplate = [
  {
    "label": appName,
    "submenu": [
      {
        "label": "About Blox Party",
        "selector": "orderFrontStandardAboutPanel:"
      },
      {
        "type": "separator"
      },
      {
        "label": "Hide Blox Party",
        "accelerator": "CmdOrCtrl+H",
        "selector": "hide:"
      },
      {
        "label": "Hide Others",
        "accelerator": "CmdOrCtrl+Shift+H",
        "selector": "hideOtherApplications:"
      },
      {
        "label": "Show All",
        "selector": "unhideAllApplications:"
      },
      {
        "type": "separator"
      },
      {
        "label": "Quit",
        "accelerator": "CmdOrCtrl+Q",
        "selector": "terminate:"
      }
    ]
  }
]

function onClosed () {
  mainWindow = null
}

function createMainWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    center: true,
    "standard-window": false,
    title: 'Blox Party'
  })
  win.loadUrl('file://' + __dirname + '/index.html')
  win.on('closed', onClosed)
  return win
}

app.on('window-all-closed', () => {if (process.platform !== 'darwin') app.quit()})
app.on('activate-with-no-open-windows', () => {if (!mainWindow) mainWindow = createMainWindow()})
app.on('ready', () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  mainWindow = createMainWindow()
})
