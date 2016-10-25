const { dialog, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const xml = require('xml2js')
const parser = new xml.Parser({trim: true, async: true});
const builder = new xml.Builder({cdata: true});
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})
  global.mainWindow = mainWindow
  if (process.env.NODE_ENV === "development") {
    // and load the index.html of the app.
    mainWindow.loadURL(`http://localhost:3000`)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/ui/index.html`)
  }


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    global.mainWindow = null;
  })
}

function loadXMLFile() {
  if (!global.mainWindow) {
    createWindow();
  }
  dialog.showOpenDialog(global.mainWindow, {
    filters: [
      {name: 'XML', extensions: ['xml']},
      {name: 'All Files', extensions: ['*']}
    ],
    properties: ['openFile', 'showHiddenFiles']
  }, (filenames) => {
    if (filenames && filenames[0]){
      fs.readFile(filenames[0], 'utf8', (err, data) => {
        if (err) throw err;
        parser.parseString(data, (err, result) => {
            if (err) throw err;
            global.mainWindow.webContents.send('openFile-reply', {
              data: result,
              pathInfo: path.parse(filenames[0]),
            });
        });
      });
    }else {
      global.mainWindow.webContents.send('openFile-reply-abort');
    }
  });
}

function saveXMLFile(data, file) {
  if (file === '/') {
    saveAsXMLFile(data, file);
  }else {
    data = builder.buildObject(data);
    if (!global.mainWindow) {
      createWindow();
    }
    const options = {
      type: 'info',
      title: 'Save',
      message: "Are you sure you want to save?",
      buttons: ['Yes', 'No']
    }
    dialog.showMessageBox(options, (index) => {
      if (index === 0) {
        fs.writeFile(file, data, 'utf8', (err) => {
          if (err) throw err
          global.mainWindow.webContents.send('saveFile-reply');
        });
      }
    });

  }
}
function saveAsXMLFile(data, file) {
  data = builder.buildObject(data);
  if (!global.mainWindow) {
    createWindow();
  }
  const options = {
    title: 'Save As',
    defaultPath: file,
    filters: [
      {name: 'XML', extensions: ['xml']},
      {name: 'All Files', extensions: ['*']}
    ],
  }
  dialog.showSaveDialog(global.mainWindow, options, (file) => {
    if (file) {
      fs.writeFile(file, data, 'utf8', (err) => {
        if (err) throw err
        global.mainWindow.webContents.send('saveFile-reply',{
          pathInfo: path.parse(file),
        });
      });
    }
  });
}
function callWithState(callback) {
  global.mainWindow.webContents.send('getState');
  ipcMain.on('getState-reply', (_,{data, path})=>callback(data, path))
}
module.exports.saveXMLFile = saveXMLFile;
module.exports.saveAsXMLFile = saveAsXMLFile;
module.exports.loadXMLFile = loadXMLFile;
module.exports.createWindow = createWindow;
module.exports.callWithState = callWithState;
