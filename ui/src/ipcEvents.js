import { ipcRenderer } from 'electron';
import File from './File';
import Data from './Data';

ipcRenderer.on('openFile-reply', (event, arg) => {
  Data.data=arg.data;
  File.path=arg.path;
  File.pathInfo = arg.pathInfo;
  File.saved=true;
})
ipcRenderer.on('saveFile-reply', (event, arg) => {
  // Data.data=arg.data;
  // File.path=arg.path;
  // File.pathInfo = arg.pathInfo;
  File.saved=true;
})
