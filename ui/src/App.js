import React from 'react';
import DocumentTitle from 'react-document-title';
import Debuger from 'mobx-react-devtools';
import './App.css';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Code from './Code';

// import Code from './Code';

const load = () => ipcRenderer.send('openFile')
const save = (file, data) => () => ipcRenderer.send('saveFile', { data: toJS(data.data), path: file.path })
const changePath = (file, data) => () => {
  file.path = `${file.pathInfo.dir}/${file.pathInfo.name}.new${file.pathInfo.ext}`
}
const Note = observer(({snippet, remove}) => (
  <div style={{marginBottom: '20px'}}>
    <input style={{width: '100%'}} value={snippet._Attribs.name} onChange={({target})=>snippet._Attribs.name=target.value} />
    <Code value={snippet.codeA} onChange={(newCode)=>snippet.codeA=newCode}/>
    <button style={{width: '100%'}} onClick={remove}>
      Delete Snippet
    </button>
  </div>
));
const List = observer(({data}) => {
  const remove = (index) => () => data.codes.snippet.splice(index, 1)
  if(data && data.codes && data.codes.snippet){
    return <div>{data.codes.snippet.map((snippet, index)=><Note key={index} snippet={snippet} remove={remove(index)} />)}</div>
  }
  return null;
});

const App = ({data, file}) => (
  <DocumentTitle title={`${file.pathInfo.name?file.pathInfo.name:'Untitled'}${file.pathInfo.ext?file.pathInfo.ext:''} - XML-Editor - ${file.pathInfo.dir?file.pathInfo.dir:'Not Saved'}`}>
    <div className="App">
      <div className="App-header">
          <button onClick={load}>Open...</button>
          <button onClick={save(file, data)}>Save</button>
          <button onClick={changePath(file, data)}>changePath</button>
      </div>
      <List data={data.data} />
      <Debuger />
    </div>
  </DocumentTitle>
);


export default observer(App);
