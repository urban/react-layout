'use strict';

var React = require('react');
// JSX spread operator will not work without this
Object.assign = require('object-assign');
var styles = require('./styles');

var Resizable = require('./resizable');

var Application = React.createClass({

  getInitialState() {
    return {
      width: 'auto'
    };
  },

  render() {

    var blockStyle = { ...styles.block, ...this.state };

    return (
      <div>
        <fieldset>
          <legend>Resize</legend>

          <div style={ styles.layout }>
            <Resizable onResize={ this.handleLayoutResize }></Resizable>
            <div style={ styles.inner }>Inner</div>
            <div style={ blockStyle }>
              One
              <Resizable onResize={ this.handleBlockResize }></Resizable>
            </div>
          </div>

          <a onClick={ this.handleResizeClick } href="#" >Resize</a>

        </fieldset>
      </div>
    );
  },

  handleBlockResize(dim) {
    // console.log('!!! Resize - block');
    console.log(dim.width);
  },

  handleLayoutResize(dim) {
    // console.log('!!! Resize - App');
    console.log(dim.width);
  },

  handleResizeClick(event) {
    event.preventDefault();
    var width = this.state.width === 'auto' ? 200 : 'auto';
    this.setState({ width });
  }

});

if (typeof window !== 'undefined') {
  React.render(
    <Application />,
    document.querySelector('#react')
  );
}

module.exports = Application;

