import * as path from 'path'
import { format as formatUrl } from 'url'
import { app, BrowserWindow, dialog, autoUpdater } from 'electron'
import createMenu from './menu'
//import { installExtensions } from './extensions'

declare const __static: string

const isDev = process.env.NODE_ENV !== 'production'
let mainWindow: BrowserWindow

app.allowRendererProcessReuse = true

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '#2c2c2c',
    icon: path.resolve(__static, 'icons/icon.png'),
    show: false,
    width: 900,
    height: 680,
    webPreferences: {
      // experimentalFeatures: true,
      // contextIsolation: false,
      nodeIntegration: true,
      preload: path.resolve(__static, 'preload.js')
    }
  })

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    mainWindow.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
    )
  }

  mainWindow.maximize()

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow && mainWindow.show()
    mainWindow && mainWindow.focus()
  })

  mainWindow.on('closed', () => app.quit())
}

app.on('ready', () => {
  //isDev && installExtensions(mainWindow)

  createMenu()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

if (isDev) {
  app.on('certificate-error', (event, _webContents, _url, _error, _certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault()
    callback(true)
  })
}

//
// AutoUpdater
//
autoUpdater.on('update-downloaded', (_, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(mainWindow, dialogOpts).then(() => {
    autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
