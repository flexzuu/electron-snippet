import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

import Codemirror from 'react-codemirror';
import './Code.css';

const options = {
	lineNumbers: true,
	readOnly: false,
}
const Code = ({ onChange, value }) => <Codemirror value={value} onChange={onChange} options={options}/>
export default Code;
