'use strict';

var utils = require('./utils');
var cleanArray = utils.cleanArray;

var SIZE_ATTRIBUTES = [
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

var ORDER_ATTRIBUTES = [
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

var ALIGN_ATTRIBUTES = [
  'start',
  'center',
  'end',
  'stretch'
];

var SELF_ALIGN_ATTRIBUTES = [
  'self-start',
  'self-center',
  'self-end',
  'self-stretch'
];

var JUSTIFY_ATTRIBUTES = [
  'justified',
  'start-justified',
  'center-justified',
  'end-justified',
  'around-justified'
];

var LAYOUT_ATTRIBUTES = []
  .concat(
    SIZE_ATTRIBUTES,
    ORDER_ATTRIBUTES,
    ALIGN_ATTRIBUTES,
    SELF_ALIGN_ATTRIBUTES,
    JUSTIFY_ATTRIBUTES
  );

function flex(nodes, isHorizontal, availableSpace) {
  if (!nodes.length) return;

  var dimension = isHorizontal ? 'width' : 'height';
  var divisibleUnits = 0;
  var sizes = nodes.
    map(function (node) {
      var unit = 1;
      var len = SIZE_ATTRIBUTES.length;
      for (var i=0, attr; i < len; i++) {
        attr = SIZE_ATTRIBUTES[i];
        if (node.hasAttribute(attr)) {
          unit += i;
          break;
        }
      }
      divisibleUnits += unit;
      return unit;
    });    

  nodes.forEach(function (node, index) {
    node.style[dimension] = Math.floor(availableSpace[dimension]) / divisibleUnits * sizes[index] + 'px';
  });
}

// flexbox self ordering attributes on children
function order(nodes) {
  var initialNodesLength = nodes.length;
  var len = ORDER_ATTRIBUTES.length;
  var results = new Array(len);
  var map = nodes.map(function (node, index) {
    // return if no props
    if (!node.props) return node;

    for (var i = 0, attr; i < len; i++) {
      attr = ORDER_ATTRIBUTES[i];
      if (node.props[attr]) {
        results.splice(i, 1, node);
        return undefined;
      }
    }
    // doesn't have an order-attribute
    return node;
  });
  // clean array of falsely values
  map = cleanArray(map);
  // return if lengths haven't changed
  if (map.length == initialNodesLength) return nodes;

  /*
  // loop through results and populate with
  // nodes that didn't have an order
  for (var i = 0; i < len; i++) {
    if (!results[i]) {
      results[i] = map.shift();
    }
  }
  */
  results = map.concat(results);
  // unnecessary because react will not render `undefined` values
  // results = cleanArray(results);
  return results;
}

// by default, children stretch to fill the cross-axis 
// (e.g. vertical stretching in a horizontal layout)
function align(component, isHorizontal, availableSpace) {
  var nodes = toArray(node.childNodes);
  // return;
  var dimension = !isHorizontal ? 'width' : 'height';
  var size = availableSpace[dimension];
  // var type = 
  nodes.forEach(function (node) {
    var style = window.getComputedStyle(node);
    if (dimension == 'width') {
      size -= parseInt(style.marginLeft) + parseInt(style.marginRight);
    } else {
      size -= parseInt(style.marginTop) + parseInt(style.marginBottom);
    }
    node.style[dimension] = Math.floor(size) + 'px';
  });
}

function justify(component, isHorizontal, availableSpace) {
  var nodes = toArray(node.childNodes);

}

module.exports = {
  LAYOUT_ATTRIBUTES: LAYOUT_ATTRIBUTES,
	flex: flex,
	order: order,
	align: align,
  justify: justify
};