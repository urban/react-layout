'use strict';

var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;
var getDimensions = require('./getDimensions');
Object.assign = require('react/lib/Object.assign');

var { getItemStyle } = require('./styles');

var dim = {
  row: 'width',
  column: 'height'
};

class LayoutItem {

  constructor() {
    this._initialStyles = null;
    this._dimensions = null;
  }

  componentWillMount() {
    this._initialStyles = this.props.style;
  }

  componentDidMount() {
    var node = this.getDOMNode();
    this._dimensions = getDimensions(node);
    Object.freeze(this._dimensions);
  }

  componentDidUpdate() {
    var node = this.getDOMNode();
    this._dimensions = getDimensions(node);
    Object.freeze(this._dimensions);
  }

  render() {
    var { children, style } = this.props;
    var newStyles = {
      ...style,
      ...getItemStyle(this.isMounted())
    };
    return cloneWithProps(children, { style: newStyles });
  }

  getDimensions() {
    return this._dimensions;
  }

  getConsumedSpace(axis) {
    var layout = this.getDimensions();
    var space = layout.leadingMargin(axis)
      + layout.trailingMargin(axis);
    if (!this.hasFlex(axis)) {
      space += layout[dim[axis]];
    }
    return space;
  }

  hasFlex(axis) {
    var props = this.props.children.props;
    var hasFlexProp = props.hasOwnProperty('flex')
      && !props.hasOwnProperty('none');
    var hasAxisDim = !!this._initialStyles[dim[axis]];
    return hasFlexProp && !hasAxisDim;
  }

}

module.exports = React.createClass(LayoutItem.prototype);
