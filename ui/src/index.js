import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configStore from './store';
import './index.css';

const store = configStore(true);

ReactDOM.render(
  <App file={store.file} data={store.data}/>,
  document.getElementById('root')
);
