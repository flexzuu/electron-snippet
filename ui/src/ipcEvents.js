import { ipcRenderer } from 'electron';
import XML from './XML';

ipcRenderer.on('openXMLFile-reply', (event, arg) => {
  XML.loadedData=arg.data;
  XML.path=arg.path;
  XML.pathInfo = arg.pathInfo;
  XML.saved=true;
})
ipcRenderer.on('saveXMLFile-reply', (event, arg) => {
  XML.loadedData=arg.data;
  XML.path=arg.path;
  XML.pathInfo = arg.pathInfo;
  XML.saved=true;
})
