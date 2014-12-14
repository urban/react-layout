'use strict';

var PROPORTIONS = [
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

module.exports = flex;

function getProportion(props) {
  var len = PROPORTIONS.length;
  for (var i = 0; i < len; i++) {
    if (props[PROPORTIONS[i]]) {
      return i + 1;
    }
  }
  return 1;
}

function flex(childObjects, availableSpace, mainDim) {
  var totalProportions = 0;
  var units = childObjects
    .map(function ({ child }) {
      if (!child.props.flex) {
        return 0;
      }
      var proportion = getProportion(child.props);
      totalProportions += proportion;
      return proportion;
    });

  childObjects
    .forEach(function ({ style }, i) {
      var unit = units[i];
      if (unit) {
        style[mainDim] = availableSpace / totalProportions * unit;
      }
    });
}
