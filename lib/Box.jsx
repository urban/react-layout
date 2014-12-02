'use strict';

var React = require('react');

class Box {

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }

}

module.exports = React.createClass(Box.prototype);
