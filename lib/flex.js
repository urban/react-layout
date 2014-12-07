'use strict';

var SIZES = [
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

function flex(childObjects, area, isHorizontal) {
  if (!childObjects.length) return;

  var divisibleUnits = 0;
  var prop = isHorizontal ? 'width' : 'height';

  var units = childObjects
    .map(function ({ child }) {
      var hasFlex = child.props.hasOwnProperty('flex');
      if (!hasFlex) return null;

      var unit = 1;
      var len = SIZES.length;
      var size;
      for (var i = 0; i < len; i++) {
        size = SIZES[i];
        if (child.props[size]) {
          unit += i;
          break;
        }
      }
      divisibleUnits += unit;
      return unit;
    });

  childObjects
    .forEach(function ({ style }, i) {
      var unit = units[i];
      if (unit !== null) {
        style[prop] = area[prop] / divisibleUnits * unit;
      }
    });
}
