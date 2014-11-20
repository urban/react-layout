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
