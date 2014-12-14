'use strict';

var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');
var mapObject = require('react/lib/mapObject');
var cloneWithProps = React.addons.cloneWithProps;

var getAvailableSpace = require('./getAvailableSpace');
var getConsumedSpace = require('./getConsumedSpace');
var getNegativeSpace = require('./getNegativeSpace');

var styles = require('./styles');

var getDimensions = require('./getDimensions');
var sumDimensions = require('./sumDimensions');
var order = require('./order');
var flex = require('./flex');
var align = require('./align');
var position = require('./position');

var dim = {
  row: 'width',
  column: 'height'
};

class Layout {

  getDefaultProps() {
    return { tag: 'div' };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    var { tag, className, children, style } = this.props;
    style = style || {};
    var newProps = {
      className: joinClasses(className, 'react-layout'),
      style: { ...style, ...styles.layout }
    };

    var refs = this.refs;
    var childObjects = [];
    if (this.isMounted()) {
      childObjects = this.layoutContent();
      var dimensionMaxes = childObjects
        .reduce(function (prev, { layout }) {
          return {
            height: Math.max(prev.height, layout.heightWithMargins),
            width: Math.max(prev.width, layout.widthWithMargins)
          }
        }, { height: 0, width: 0 });
      var container = getDimensions(this.getDOMNode());
      newProps.style.height = style.hasOwnProperty('height') ? style.height : dimensionMaxes.height + container.marginBottom;
    }

    children = children
      .map( (child, i) => {
        var newProps = {
          key: child.props.key || 'key' + i,
          ref: 'box' + i,
          style: this.isMounted() ? childObjects[i].style : styles.unresolved
        };
        return cloneWithProps(child, newProps);
      });

    var component = React.createElement.bind(null, tag);
    return component(newProps, children);
  }

  layoutContent() {
    var { tag, children, className, horizontal } = this.props;

    var mainAxis = horizontal ? 'row' : 'column';
    var crossAxis = horizontal ? 'column' : 'row';

    var node = this.getDOMNode();
    var refs = this.refs;
    var childObjects = children
      .map(function (child, i) {
        var node = refs['box' + i].getDOMNode();
        return {
          child,
          layout: getDimensions(node),
          style: { ...styles.resolved }
        };
      });

    var containedSpace = getAvailableSpace(node);
    var consumedSpace = childObjects
      .map(getConsumedSpace)
      .reduce(sumDimensions);
    var negativeSpace = getNegativeSpace(containedSpace, consumedSpace);

    flex(childObjects, negativeSpace[dim[mainAxis]], dim[mainAxis]);
    align(childObjects, containedSpace[dim[mainAxis]], mainAxis);
    position(childObjects, mainAxis, crossAxis);

    return childObjects;
  }
}

module.exports = React.createClass(Layout.prototype);
