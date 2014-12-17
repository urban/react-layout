'use strict';

var leading = {
  row: 'left',
  column: 'top'
};

var trailing = {
  row: 'right',
  column: 'bottom'
};

module.exports = getDimensions;

function getDimensions(node) {
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

  dim.getPadding = getSpace.bind(dim, 'padding');
  dim.leadingPadding = getLeading.bind(dim, 'padding');
  dim.trailingPadding = getTrailing.bind(dim, 'padding');

  dim.getMargin = getSpace.bind(dim, 'margin');
  dim.leadingMargin = getLeading.bind(dim, 'margin');
  dim.trailingMargin = getTrailing.bind(dim, 'margin');

  return dim;
};

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function getSpace(space, side) {
  return this[space + capitalizeFirst(side)];
}

function getLeading(space, axis) {
  return getSpace.call(this, space, leading[axis]);
}

function getTrailing(space, axis) {
  return getSpace.call(this, space, trailing[axis]);
}
