import React from 'react';
import DocumentTitle from 'react-document-title';
import './App.css';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react';
import Code from './Code';

const App = ({xml}) => (
  <DocumentTitle title={`XML-Editor - ${xml.path}${xml.saved?'':'*'}`}>
    <div className="App">
      <div className="App-header">
          <button onClick={
              ()=>
              ipcRenderer.send('openXMLFile')
            }>Open...</button>
            <button onClick={
                ()=>
                ipcRenderer.send('saveXMLFile', { data: xml.loadedData, path: xml.path })
              }>Save</button>
      </div>
      <Code value={xml.loadedData}/>
    </div>
  </DocumentTitle>
);


export default observer(App);
