'use strict';

var React = require('react');
// JSX spread operator will not work without this
Object.assign = require('object-assign');

var styles = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1
};

module.exports = React.createClass({

  displayName: 'Resizable',

  propTypes: {
    onResize: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.addResizeListener();
  },

  componentWillUnmount() {
    this.removeResizeListener();
  },

  render() {
    return (
      <object
        ref="resizable"
        type="text/html"
        style={ styles }>
        </object>
    );
  },

  handleResize(event) {
    var onResize = this.props.onResize;
    var resizable = this.refs.resizable;
    if (this._resize) {
      this.cancelFrame(this._resize);
    }
    this._resize = this.requestFrame(function () {
      var node = resizable.getDOMNode();
      onResize({
        height: node.offsetHeight,
        width: node.offsetWidth
      });
    });
  },

  requestFrame(callback) {
    var raf = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || function (callback) {
        return window.setTimeout(callback, 20);
      };
    return raf(callback);
  },

  cancelFrame(id) {
    var cancelRaf = window.cancelAnimationFrame
      || window.mozCancelAnimationFrame
      || window.webkitCancelAnimationFrame
      || window.clearTimeout;

    return cancelRaf(id);
  },

  addResizeListener() {
    var node = this.getDOMNode();
    if (document.attachEvent) {
      node.parentNode.attachEvent('onresize', this.handleResize);
    } else {
      node.contentDocument.defaultView.addEventListener('resize', this.handleResize);
    }
  },

  removeResizeListener() {
    var node = this.getDOMNode();
    if (document.detachEvent) {
      node.parentNode.detachEvent('onresize', this.handleResize);
    } else {
      node.contentDocument.defaultView.removeEventListener('resize', this.handleResize);
    }
  }

});
