import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import App from './App';
import configStore from './store';
import './index.css';

const store = configStore(true);

ReactDOM.render(
  <App file={store.file} data={store.data}/>,
  document.getElementById('root')
);
document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())
document.getElementById('root').ondrop = (e) => {
    e.preventDefault()
    ipcRenderer.send('openFile', e.dataTransfer.files[0].path);
}
