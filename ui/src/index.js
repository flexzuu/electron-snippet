import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import XML from './XML';
import './index.css';
import './ipcEvents';
ReactDOM.render(
  <App xml={XML}/>,
  document.getElementById('root')
);
