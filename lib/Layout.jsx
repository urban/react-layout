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

var leading = {
  row: 'left',
  column: 'top'
};

var trailing = {
  row: 'right',
  column: 'bottom'
};

class Layout {

  getDefaultProps() {
    return { tag: 'div' };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    var { tag, className, children, style, horizontal } = this.props;
    var mainAxis = horizontal ? 'row' : 'column';
    var crossAxis = horizontal ? 'column' : 'row';
    var newProps = {
      className: joinClasses(className, 'react-layout'),
      style: { ...style, ...styles.layout }
    };

    var refs = this.refs;
    if (this.isMounted()) {
      var container = getDimensions(this.getDOMNode());
      var childObjects = this.layoutContent();

      var mainAxisDim = container.getPadding(leading[mainAxis]) +
        container.getPadding(trailing[mainAxis]);
      var crossAxisDim = 0;

      childObjects
        .forEach(function ({ layout }) {
          // sum the main axis
          mainAxisDim += layout[dim[mainAxis] + 'WithMargins'];
          // determin the largest child
          crossAxisDim = max(
            crossAxisDim,
            layout[dim[crossAxis] + 'WithMargins']
          );
        });

      // main axis the size of the container or the size of the content
      mainAxisDim = max(mainAxisDim, container[dim[mainAxis]]);
      // add container padding to cross axis dimension
      crossAxisDim += container.getPadding(leading[crossAxis]) +
        container.getPadding(trailing[crossAxis]);

      newProps.style[dim[mainAxis]] = max(
        newProps.style[dim[mainAxis]],
        mainAxisDim
      );

      newProps.style[dim[crossAxis]] = max(
        newProps.style[dim[crossAxis]],
        crossAxisDim
      );
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

function max(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

function hasProp(obj, str) {
  return obj.hasOwnProperty(str);
}
