import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import Codemirror from 'react-codemirror';
import XML from './XML';
import './Code.css';
const onChange = (newState) => {
  XML.loadedData=newState
  XML.saved=false
}
const options = {
	lineNumbers: true,
	readOnly: false,
	mode: 'xml',
}
const Code = ({ value }) => <Codemirror value={value} onChange={onChange} options={options}/>
export default Code;
