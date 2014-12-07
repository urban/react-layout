'use strict';

module.exports = function (node) {
  var dimensions = node.getBoundingClientRect();

  var styles = window.getComputedStyle(node);
  ['Top', 'Right', 'Bottom', 'Left']
    .forEach(function (position) {
      var margin = 'margin' + position;
      var padding = 'padding' + position;
      dimensions[margin] = parseInt(styles[margin]);
      dimensions[padding] = parseInt(styles[padding]);
    });

  var { width, height } = dimensions;
  dimensions.fullHeight = height + dimensions.marginTop + dimensions.marginBottom;
  dimensions.fullWidth = width + dimensions.marginLeft + dimensions.marginRight;

  return dimensions;
}
