import { ipcRenderer } from 'electron';
import File from './File';
import Data from './Data';

ipcRenderer.on('openFile-reply', (event, arg) => {
  Data.data=arg.data;
  File.pathInfo = arg.pathInfo;
  File.saved=true;
  File.loading=false;
})
ipcRenderer.on('openFile-reply-abort', (event, arg) => {
  File.loading=false;
})
ipcRenderer.on('saveFile-reply', (event, arg) => {
  // Data.data=arg.data;
  // File.path=arg.path;
  // File.pathInfo = arg.pathInfo;
  File.saved=true;
})
