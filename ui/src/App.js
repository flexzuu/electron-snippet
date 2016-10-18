import React from 'react';
import DocumentTitle from 'react-document-title';
import Debuger from 'mobx-react-devtools';
import './App.css';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react';
import Code from './Code';  

const App = ({xml}) => (
  <DocumentTitle title={`${xml.pathInfo.name?xml.pathInfo.name:'Untitled'}${xml.pathInfo.ext?xml.pathInfo.ext:''} - XML-Editor - ${xml.pathInfo.dir?xml.pathInfo.dir:'Not Saved'}`}>
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
            <button disabled>{xml.extention}</button>
      </div>
      <Code value={xml.loadedData} mode={xml.mode}/>
      <Debuger />
    </div>
  </DocumentTitle>
);


export default observer(App);
