'use strict';
var React = require('react');

export class One extends React.Component {
    render() {
      return React.createElement('h4', null, 'I was told you tell you: ' + this.props.data.something);
    }
}
export var name = "One"
export function onSubmit(done) {
    done();
}
