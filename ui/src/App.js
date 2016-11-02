import React from 'react';
import DocumentTitle from 'react-document-title';
import Debuger from 'mobx-react-devtools';
import './App.css';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Code from './Code';

const load = (file) => () => {
  ipcRenderer.send('openFile');
  file.loading = true;
}
const save = (file, data) => () => ipcRenderer.send('saveFile', { data: toJS(data.data), path: file.path })
const saveAs = (file, data) => () => ipcRenderer.send('saveAsFile', { data: toJS(data.data), path: file.path })
const add = (data) => () => {
    data.data.codes.snippet.push({
    $:{
      name: 'Untitled',
    },
    codeA: [''],
  })
}
const changeActive = (data) => () => {
  data.active = 10;
}
const Note = observer(({snippet, remove, disabled = false}) => (
  <div style={{}} className="note">
    <input style={{width: '40%'}} value={snippet.$.name} onChange={({target})=>snippet.$.name=target.value} />
    <button onClick={remove} disabled={disabled}>
      Delete
    </button>

    <Code value={snippet.codeA[0]} onChange={(newCode)=>snippet.codeA[0]=newCode}/>

  </div>
));
//
const List = observer(({data}) => {
  const remove = (index) => () => data.codes.snippet.splice(index, 1)
  const select = (index) => () => {
    data.active = index
  }

  if(data.data && data.data.codes && data.data.codes.snippet){
    return (
      <div className="wrapper">
      <div className="codeView">
        {data.data.codes.snippet[data.active] && <Note snippet={data.data.codes.snippet[data.active]} remove={remove(data.active)} />}
      </div>
      <div className="codeList">
        <ul>{data.data.codes.snippet.map((snippet, index)=>
          <li
            key={index}
            onClick={select(index)}
          >
            {snippet.$.name}
          </li>
        )}</ul>
      </div>
      </div>
    )

  }
  return null;
});

const App = ({data, file}) => (
  <DocumentTitle title={`${file.pathInfo.name?file.pathInfo.name:'Untitled'}${file.pathInfo.ext?file.pathInfo.ext:''} - XML-Editor - ${file.pathInfo.dir?file.pathInfo.dir:'Not Saved'}`}>
    <div className="App">
      <div className="App-header">
          <button onClick={load(file)}>Open...</button>
          <button onClick={save(file, data)} disabled={file.pathInfo.name === ''}>Save</button>
          <button onClick={saveAs(file, data)}>Save As</button>
          <button onClick={add(data)}>Add Snippet</button>
          <button onClick={changeActive(data)}>changeActive</button>

      </div>
      {file.loading?<div className="loading">loading...</div>:<List data={data} />}
      <Debuger />
    </div>
  </DocumentTitle>
);


export default observer(App);
