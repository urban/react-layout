'use strict';

var cleanArray = require('./cleanArray');

var ORDER_PROPS = [
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

module.exports = function (elements) {
  var len = ORDER_PROPS.length;
  var results = new Array(len);
  var map = elements.map(function (node, i) {
    // return if no props
    if (!node.props) return node;

    for (var i = 0, prop; i < len; i++) {
      prop = ORDER_PROPS[i];
      if (node.props.hasOwnProperty(prop)) {
        results.splice(i, 1, node);
        return undefined;
      }
    }
    // doesn't have an order prop
    return node;
  });
  // clearn array of falsely values
  map = cleanArray(map);
  return map.concat(results);
}
