import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import File from './File';
import Data from './Data';
import './index.css';
import './ipcEvents';
ReactDOM.render(
  <App file={File} data={Data}/>,
  document.getElementById('root')
);
