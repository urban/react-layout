'use strict';

var testElement = () => {
  var element;
  return (() => {
    if (!element) {
      element = document.createElement('div');
    }
    return element;
  })();
}

function is(prop, value) {
  return typeof testElement().style[prop] === value;
}

function testStyleProp(prop, value) {
  var before;
  var propStr = prop;
  var support = !is(propStr, 'undefined');
  if (!support) {
    // titlecase
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    // prefix
    var prefixes = 'webkit moz o ms'.split(' ');
    var len = prefixes.length;
    for (var i = 0; i < len; i++) {
      propStr = prefixes[i] + prop;
      support = !is(propStr, 'undefined');
      if (support) break;
    }
  }

  // if support passed, do a set-and-check test
  var hasValue = typeof value != 'undefined';
  if (support && hasValue) {
    before = testElement().style[propStr];
    try {
      testElement().style[propStr] = value;
    } catch (e) {};
    // test if property value has changed
    if (testElement().style[propStr] != before) {
      return true;
    }
  }
  return false;  
}

module.exports = {
  testStyleProp
};