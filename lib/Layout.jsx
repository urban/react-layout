'use strict';

var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');
var mapObject = require('react/lib/mapObject');
var cloneWithProps = React.addons.cloneWithProps;
var orderElements = require('./orderElements');

var getAvailableSpace = require('./getAvailableSpace');
var getConsumedSpace = require('./getConsumedSpace');
var getNegativeSpace = require('./getNegativeSpace');

var measure = require('./measure');
var flex = require('./flex');
var align = require('./align');

Object.assign = require('object-assign');

var styles = {
  base: {
    position: 'relative'
  },
  horizontal: {

  },
  vertical: {

  },
  resolved: {
    display: 'table-cell',
    float: 'left'
  },
  unresolved: {
    display: 'table-cell',
    float: 'left',
    opacity: 0,
    overflow: 'hidden'
  }
};

class Layout {

  getDefaultProps() {
    return { tag: 'div' }
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    var { tag, className, horizontal: isHorizontal } = this.props;
    var children = !this.isMounted() ? this.preRenderChildren() : this.renderChildren();

    var props = {
      className: joinClasses(className, 'react-layout'),
      style: Object.assign({}, styles.base)
    };

    if (this.isMounted()) {
      var dimensionMaxes = Object.keys(this.refs)
        .map( key => {
          var node = this.refs[key].getDOMNode();
          return measure(node);
        })
        .reduce(function (prev, curr) {
          return {
            height: Math.max(prev.height, curr.fullHeight),
            width: Math.max(prev.width, curr.fullWidth)
          };
        });

      var container = measure(this.getDOMNode());
      if (isHorizontal) {
        props.style.height = dimensionMaxes.height + container.marginBottom;
      }
    }

    children = children
      .map(function ({ child, newProps }, i) {
        newProps.key = 'key' + i;
        newProps.ref = 'box' + i;
        return cloneWithProps(child, newProps);
      });

    var component = React.createElement.bind(null, tag);
    return component(props, children);
  }

  preRenderChildren() {
    var { tag, className, children } = this.props;
    return children
      .map( (child, i) => {
        var newProps = {
          style: styles.unresolved
        };
        return { child, newProps };
      });
  }

  renderChildren() {
    var { tag, children, className, ...other } = this.props;
    var { horizontal: isHorizontal } = other;

    var node = this.getDOMNode();
    var childObjects = children
      .map( (child, i) => {
        return {
          child,
          node: this.refs['box' + i].getDOMNode(),
          style: Object.assign({}, styles.resolved)
        };
      });

    var containedSpace = getAvailableSpace(node);
    var consumedSpace = childObjects
      .map(getConsumedSpace)
      .reduce(sumDimensions, { width: 0, height: 0 });
    var negativeSpace = getNegativeSpace(containedSpace, consumedSpace);

    flex(childObjects, negativeSpace, isHorizontal);
    align(childObjects, containedSpace, isHorizontal);

    children = children
      .map(function (child, i) {
        var newProps = {
          style: childObjects[i].style
        };
        return { child, newProps };
      });

    return children;
  }
}


module.exports = React.createClass(Layout.prototype);

function sumDimensions(prev, curr) {
  return {
    height: prev.height + curr.height,
    width: prev.width + curr.width
  }
}
