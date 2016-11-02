import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/neo.css';

import Codemirror from 'react-codemirror';
import './Code.css';

const options = {
	mode: 'text/x-c++src',
	lineNumbers: true,
	readOnly: false,
	theme: 'neo',
}
const Code = ({ onChange, value }) => <Codemirror value={value} onChange={onChange} options={options}/>
export default Code;
