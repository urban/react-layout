'use strict';

var leading = {
  row: 'marginLeft',
  column: 'marginTop'
};

var trailing = {
  row: 'marginRight',
  column: 'marginBottom'
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

  dim.leadingMargin = function (axis) {
    return dim[leading[axis]];
  };

  dim.trailingMargin = function (axis) {
    return dim[trailing[axis]];
  };

  return dim;
}
