/**
 * react-layout - Declarative flexbox layouts in React
 * @version 0.0.1
 * @link https://github.com/urban/react-layout
 * @license ISC
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Layout=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
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

function Layout(){}

  Layout.prototype.getDefaultProps=function() {
    return {
      tag: 'div',
      horizontal: false,
      vertical: false,
    };
  };

  Layout.prototype.render=function() {
    var component = React.createElement.bind(null, this.props.tag);

    var className = classSet({
    	'react-layout': true,
    	'horizontal': this.props.horizontal,
    	'vertical': this.props.vertical
    });

    var children = React.Children.map(this.props.children, function(child, i)  {
    	var className = getFlexItemClassNames(child.props);
    	var newProps = { className:className };

    	if (child.key) { newProps.key = child.key }
    	if (child.ref) { newProps.ref = child.ref }

    	return cloneWithProps(child, newProps);
    });

    return component({ className:className, }, children);
  };



module.exports = React.createClass(Layout.prototype);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./getFlexItemClassNames":2,"./hasStyleProp":3,"./styles.css":4,"./styles.ie.css":5}],2:[function(require,module,exports){
'use strict';

var SIZE = [
	'auto',
	'none',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve'
];

var ORDER = [
	'self-one',
	'self-two',
	'self-three',
	'self-four',
	'self-five',
	'self-six',
	'self-seven',
	'self-eight',
	'self-nine',
	'self-ten',
	'self-eleven',
	'self-twelve'
];

var names = SIZE.concat(ORDER);

function getFlexItemClassNames(props) {
	if (!props.flex) return '';

	var classList = ['flex'];
	Object.keys(props).forEach(function(key)  {
		if (names.indexOf(key) !== -1) {
			classList.push(key);
		}
	});
	return classList.join(' ');
}

module.exports = getFlexItemClassNames;
},{}],3:[function(require,module,exports){
'use strict';

var test = {};

module.exports = hasStyleProp;

function hasStyleProp(prop, value) {
  initTest();

  var initialValue;
  var propString = prop;
  var hasSupport = !typeOfStyle(propString, 'undefined');

  if (!hasSupport) {
    // titlecase
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    // prefix
    var prefixes = 'webkit moz o ms'.split(' ');
    // loop through prefixes until valid
    var length = prefixes.length;
    for (var i = 0; i < length; i++) {
      propString = prefixes[i] + prop;
      hasSupport = !typeOfStyle(propString, 'undefined');
      if (hasSupport) break;
    }
  }

  // if hasSupport passed, do a set-and-check test
  var hasValue = typeof value !== 'undefined';
  if (hasSupport && hasValue) {
    initialValue = test.style[propString];
    try {
      test.style[propString] = value;
    } catch (e) {};

    // test if property value has changed
    hasSupport = test.style[propString] != initialValue;
  }

  clearTest();
  return hasSupport;
}

function initTest() {
  if (!test.element || !test.style) {
    test.element = document.createElement('div');
    test.style = test.element.style;
  }
}

function clearTest() {
  delete test.style;
  delete test.element;
}

function typeOfStyle(prop, value) {
  return typeof test.style[prop] === value;
}

},{}],4:[function(require,module,exports){
var css = "*, *:before, *:after {\n  box-sizing: border-box;\n}\n\n.react-layout.horizontal,\n.react-layout.vertical {\n  display: flex;\n}\n\n.react-layout.horizontal { flex-direction: row; }\n.react-layout.vertical { flex-direction: column; }\n/* SIZE */\n.react-layout > .flex \t\t\t\t{ flex: 1; }\n.react-layout > .flex.auto\t\t{ flex: 1 1 auto; }\n.react-layout > .flex.none\t\t{ flex: none; }\n.react-layout > .flex.one\t \t\t{ flex: 1; }\n.react-layout > .flex.two\t \t\t{ flex: 2; }\n.react-layout > .flex.three\t\t{ flex: 3; }\n.react-layout > .flex.four\t\t{ flex: 4; }\n.react-layout > .flex.five\t\t{ flex: 5; }\n.react-layout > .flex.six\t \t\t{ flex: 6; }\n.react-layout > .flex.seven\t\t{ flex: 7; }\n.react-layout > .flex.eight\t\t{ flex: 8; }\n.react-layout > .flex.nine\t\t{ flex: 9; }\n.react-layout > .flex.ten\t \t\t{ flex: 10; }\n.react-layout > .flex.eleven\t{ flex: 11; }\n.react-layout > .flex.twelve\t{ flex: 12; }\n/* ORDER */\n.react-layout > .self-one\t\t\t{ order: 1; }\n.react-layout > .self-two\t\t\t{ order: 2; }\n.react-layout > .self-three\t\t{ order: 3; }\n.react-layout > .self-four\t\t{ order: 4; }\n.react-layout > .self-five\t\t{ order: 5; }\n.react-layout > .self-six\t\t\t{ order: 6; }\n.react-layout > .self-seven\t\t{ order: 7; }\n.react-layout > .self-eight\t\t{ order: 8; }\n.react-layout > .self-nine\t\t{ order: 9; }\n.react-layout > .self-ten\t\t\t{ order: 10; }\n.react-layout > .self-eleven\t{ order: 11; }\n.react-layout > .self-twelve\t{ order: 12; }"; (require("react-layout/node_modules/cssify"))(css); module.exports = css;
},{"react-layout/node_modules/cssify":6}],5:[function(require,module,exports){
var css = ".react-layout:before,\n.react-layout:after {\n  content: ' ';\n  display: table;\n}\n\n.react-layout:after { clear: both; }\n\n.react-layout.horizontal > * {\n  display: table-cell;\n  float: left;\n}\n\n.react-layout > .flex { width: auto; }"; (require("react-layout/node_modules/cssify"))(css); module.exports = css;
},{"react-layout/node_modules/cssify":6}],6:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}]},{},[1])(1)
});


//# sourceMappingURL=react-layout.js.map