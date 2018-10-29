'use strict';
import React from 'react';

export class component extends React.Component {
    render() {
      return <h4>I was told you tell you: {this.props.data.something}</h4>;
    }
}
export var name = "One"
export function onSubmit(done) {
    done();
}
