'use strict';

var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;
var orderElements = require('./orderElements');
var getDimensions = require('./getDimensions');
var getAvailableSpace = require('./getAvailableSpace');
Object.assign = require('object-assign');

var styles = {
  base: {
    position: 'relative'
  },
  horizontal: {

  },
  vertical: {

  },
  box: {
    display: 'table-cell',
    position: 'absolute'
  },
  unresolved: {
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute'
  }
};

class Layout {

  getDefaultProps() {
    return {
      tag: 'div'
    }
  }

  getInitialState() {
    return {
      resolved: false
    };
  }

  componentWillMount() {
    this.preRender();
  }

  componentDidMount() {
    this.setState({ resolved: true });
  }

  preRender() {
    var children = this.props.children;
    if (Array.isArray(children)) {
      this.props.children = orderElements(children);
    }
  }

  render() {

    var component = React.createElement.bind(null, this.props.tag);
    var isResolved = this.state.resolved;

    var children = this.props.children
      .map(mapExtraProps)
      .map(isResolved ? mapResolved : mapUnresolved)
      .map(mapClone);

    return component({ className: 'react-layout' }, children);
  }
}

module.exports = React.createClass(Layout.prototype);

function mapExtraProps(element, i) {
  var props = Object.assign({
    style: {}
  }, element.props);
  if (element.key) { props.key = element.key }
  if (element.ref) { props.ref = element.ref }
  return { element, props };
}

function mapUnresolved(clone, i) {
  Object.assign(clone.props.style, styles.unresolved);
  return clone;
}

function mapResolved(clone, i) {
  clone.props.style = styles.box;
  return clone;
}

function mapClone(clone, i) {
  return cloneWithProps(clone.element, clone.props);
}
