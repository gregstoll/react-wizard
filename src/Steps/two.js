'use strict';
import React from 'react';
//import Input from 'react-bootstrap/lib/Input';

export var name = 'Two';
export function onSubmit(done) {
    if(!this.props.data.name){
      return done(new Error('but.. You MUST enter your name.'));
    }
    done();
  };

export class component extends React.Component {
    onNameChange(e) {
      this.props.data.name = e.target.value;
    }

    render() {
      return <input type="text" label="Enter your name" onChange={this.onNameChange} />;
    }
}
