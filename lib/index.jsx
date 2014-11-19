'use strict';

var React = require('react');
var cx = require('react/lib/cx');
var cloneWithProps = require('react/lib/cloneWithProps');
var getFlexItemClassNames = require('./getFlexItemClassNames');
var { testStyleProp } = require('./utils');

var hasFlexboxSupport = testStyleProp('flexWrap', 'wrap');

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

    var className = cx({
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
