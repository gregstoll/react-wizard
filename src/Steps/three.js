'use strict';
import React from 'react';

export var name = 'Three';
export function onSubmit(done) {
    done();
  };

export class component extends React.Component {
    render() {
      return <h4>Your name is {this.props.data.name}</h4>;
    }
}
