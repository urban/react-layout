'use strict';

module.exports = function (node) {
  var rect = node.getBoundingClientRect();
  var style = window.getComputedStyle(node);

  var dimenstions = {
    height: rect.height,
    width: rect.width
  };

  ['Top', 'Right', 'Bottom', 'Left'].forEach(function (position) {
    var margin = 'margin' + position;
    var padding = 'padding' + position;
    dimenstions[margin] = parseInt(style[margin]);
    dimenstions[padding] = parseInt(style[padding]);
  });

  return dimenstions;
}
