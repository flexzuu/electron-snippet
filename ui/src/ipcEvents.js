import { ipcRenderer } from 'electron';
import { toJS } from 'mobx';
export default (data,file) => {
  ipcRenderer.on('openFile-reply', (event, arg) => {
    data.data = arg.data;
    file.pathInfo = arg.pathInfo;
    file.saved=true;
    file.loading=false;
  })
  ipcRenderer.on('openFile-reply-abort', (event, arg) => {
    file.loading=false;
  })
  ipcRenderer.on('saveFile-reply', (event, arg) => {
    if (arg.pathInfo) {
      file.pathInfo = arg.pathInfo
    }
    file.saved=true;
  })
  ipcRenderer.on('getState', (event, arg) => {
    ipcRenderer.send('getState-reply', { data: toJS(data.data), path: file.path })
  })
}
