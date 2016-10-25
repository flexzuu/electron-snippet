import { ipcRenderer } from 'electron';
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
    file.saved=true;
  })
}
