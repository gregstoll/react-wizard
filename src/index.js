import React from 'react';
import ReactDOM from 'react-dom';
import Wizard from './Wizard';
import Steps from './Steps';

ReactDOM.render(<Wizard steps={Steps} something="Hello" />, document.getElementById('container'));
