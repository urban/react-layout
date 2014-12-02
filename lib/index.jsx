'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var getFlexItemClassNames = require('./getFlexItemClassNames');
var hasStyleProp = require('./hasStyleProp');

var hasFlexboxSupport = hasStyleProp('flexWrap', 'wrap');

if (hasFlexboxSupport) {
  require('./styles.css');
} else {
  require('./styles.ie.css');
}

class Layout {

  getDefaultProps() {
    return {
      tag: 'div',
      horizontal: false,
      vertical: false,
    };
  }

  render() {
    var component = React.createElement.bind(null, this.props.tag);

    var className = classSet({
    	'react-layout': true,
    	'horizontal': this.props.horizontal,
    	'vertical': this.props.vertical
    });

    var children = React.Children.map(this.props.children, (child, i) => {
    	var className = getFlexItemClassNames(child.props);
    	var newProps = { className };

    	if (child.key) { newProps.key = child.key }
    	if (child.ref) { newProps.ref = child.ref }

    	return cloneWithProps(child, newProps);
    });

    return component({ className, }, children);
  }

}

module.exports = React.createClass(Layout.prototype);
