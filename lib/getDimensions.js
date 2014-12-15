'use strict';

var leading = {
  row: 'left',
  column: 'top'
};

var trailing = {
  row: 'right',
  column: 'bottom'
};

module.exports = function (node) {
  var dim = node.getBoundingClientRect();

  var styles = window.getComputedStyle(node);
  ['Top', 'Right', 'Bottom', 'Left']
    .forEach(function (pos) {
      var margin = 'margin' + pos;
      var padding = 'padding' + pos;
      dim[margin] = parseInt(styles[margin]);
      dim[padding] = parseInt(styles[padding]);
    });

  var { width, height } = dim;
  dim.heightWithMargins = height + dim.marginTop + dim.marginBottom;
  dim.widthWithMargins = width + dim.marginLeft + dim.marginRight;

  dim.getPadding = function (side) {
    return dim['padding' + capitalizeFirst(side)];
  };

  dim.getMargin = function (side) {
    return dim['margin' + capitalizeFirst(side)];
  };

  dim.leadingMargin = function (axis) {
    return dim.getMargin(leading[axis]);
  };

  dim.trailingMargin = function (axis) {
    return dim.getMargin(trailing[axis]);
  };

  return dim;
};

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
