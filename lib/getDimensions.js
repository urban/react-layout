'use strict';

module.exports = function (node) {
  var rect = node.getBoundingClientRect();
  var style = window.getComputedStyle(node);
  var dimensions = {
    height: rect.height,
    width: rect.width
  };

  ['Top', 'Right', 'Bottom', 'Left']
    .forEach(function (position) {
      var margin = 'margin' + position;
      var padding = 'padding' + position;
      dimensions[margin] = parseInt(style[margin]);
      dimensions[padding] = parseInt(style[padding]);
    });

  return dimensions;
}
