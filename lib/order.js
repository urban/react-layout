'use strict';

var cleanArray = require('./cleanArray');

var POSITIONS = [
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

function getOrder(props) {
  var len = POSITIONS.length;
  for (var i = 0; i < len; i++) {
    if (props[POSITIONS[i]]) {
      return i;
    }
  }
}

module.exports = function (elements) {
  var results = new Array(POSITIONS.length);
  var map = elements.map(function (node, i) {
    var order = getOrder(node.props);
    if (order) {
      results.splice(order, i, node);
    }
    // doesn't have an order prop
    return node;
  });
  // clearn array of falsely values
  map = cleanArray(map);
  return map.concat(results);
}
