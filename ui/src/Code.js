import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

import Codemirror from 'react-codemirror';
import XML from './XML';
import './Code.css';
const onChange = (newState) => {
  XML.loadedData=newState
  XML.saved=false
}
const options = (mode) => {
  return {
  	lineNumbers: true,
  	readOnly: false,
  	mode: mode,
  }
}
const Code = ({ value, mode }) => <Codemirror value={value} onChange={onChange} options={options(mode)}/>
export default Code;
