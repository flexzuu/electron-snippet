const { ipcMain } = require('electron')
const { loadXMLFile, saveXMLFile, createWindow, saveAsXMLFile } = require('./api')

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('openFile', () => loadXMLFile())
ipcMain.on('saveFile', (event, {data, path}) => saveXMLFile(data,path))
ipcMain.on('saveAsFile', (event, {data, path}) => saveAsXMLFile(data,path))
