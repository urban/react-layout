'use strict';

var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');

var styles = require('./styles');

var getDimensions = require('./getDimensions');
var order = require('./order');
var flex = require('./flex');
var align = require('./align');
var position = require('./position');

var LayoutItem = require('./LayoutItem');

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

var count = 0;

class Layout {

  getDefaultProps() {
    return { tag: 'div' };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.shouldUpdateLayout()) {
      console.log('UPDATE /////////////////');
      this.forceUpdate();
    }
  }

  shouldUpdateLayout() {
    var mainAxis = this.getMainAxis();
    var content = this.getContent();
    var [mainAxisDim, crossAxisDim] = this.getContentDimensions(content);
    var availableSpace = this.getAvailableSpace(mainAxis);
    return mainAxisDim > availableSpace;
  }

  render() {
    var { tag, className, children, style } = this.props;

    var mainAxis = this.getMainAxis();
    var crossAxis = this.getCrossAxis();

    var newProps = {
      className: joinClasses(className, 'react-layout'),
      style: { ...style, ...styles.layout, ...styles[mainAxis] }
    };

    var refs = this.refs;
    if (this.isMounted()) {
      var container = getDimensions(this.getDOMNode());
      var content = this.layoutContent();

      var [ mainAxisDim, crossAxisDim ] = this.getContentDimensions(content);

      mainAxisDim += container.getPadding(leading[mainAxis]) +
        container.getPadding(trailing[mainAxis]);

      // main axis the size of the container or the size of the content
      mainAxisDim = max(mainAxisDim, container[dim[mainAxis]]);
      // add container padding to cross axis dimension
      crossAxisDim += container.getPadding(leading[crossAxis]) +
        container.getPadding(trailing[crossAxis]);

      crossAxisDim = max(crossAxisDim, container[dim[crossAxis]]);
      // set the container demensions
      newProps.style[dim[mainAxis]] = mainAxisDim;
      newProps.style[dim[crossAxis]] = crossAxisDim;
    }

    children = children
      .map( (child, i) => {
        var newProps = {
          key: child.props.key || 'key' + i,
          ref: 'box' + i,
          style: this.isMounted() ? content[i].style : {}
        };
        return LayoutItem(newProps, child);
      });

    var component = React.createElement.bind(null, tag);
    return component(newProps, children);
  }

  getContent() {
    var { children } = this.props;
    var refs = this.refs;
    return children
      .map(function (child, i) {
        return {
          ref: refs['box' + i],
          child,
          style: { }
        };
      });
  }

  layoutContent() {
    var { tag, children, className } = this.props;

    var [mainAxis, crossAxis] = this.getAxis();
    var content = this.getContent();

    var containedSpace = this.getAvailableSpace(mainAxis);
    var consumedSpace = content
      .reduce(function (prev, curr) {
        return prev + curr.ref.getConsumedSpace(mainAxis);
      }, 0);

    var negativeSpace = containedSpace - consumedSpace;

    flex(content, negativeSpace, dim[mainAxis]);
    align(content, containedSpace, mainAxis);
    position(content, mainAxis, crossAxis);

    return content;
  }

  isHorizontal() {
    return !this.props.hasOwnProperty('vertical');
  }

  getAxis() {
    return [this.getMainAxis(), this.getCrossAxis()];
  }

  getMainAxis() {
    return this.isHorizontal() ? 'row' : 'column';
  }

  getCrossAxis() {
    return this.isHorizontal() ? 'column' : 'row';
  }

  getDimensions() {
    var node = this.getDOMNode();
    return getDimensions(node);
  }

  getAvailableSpace(axis) {
    var layout = this.getDimensions();
    return layout[dim[axis]]
      - layout.leadingPadding(axis)
      - layout.trailingPadding(axis);
  }

  getContentDimensions(content) {
    var [mainAxis, crossAxis] = this.getAxis();
    var mainAxisDim = 0;
    var crossAxisDim = 0;

    content
      .forEach(function ({ ref }) {
        var layout = ref.getDimensions();
        // sum the main axis
        mainAxisDim += layout[dim[mainAxis] + 'WithMargins'];
        // determin the largest child
        crossAxisDim = max(
          crossAxisDim,
          layout[dim[crossAxis] + 'WithMargins']
        );
      });

    return [mainAxisDim, crossAxisDim];
  }

}

module.exports = React.createClass(Layout.prototype);

function max(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}
