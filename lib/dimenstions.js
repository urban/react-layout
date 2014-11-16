'use strict';

function getDimensions(node) {
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

function getAvailableSpace(node) {
  var pseudoElementWidth = 2;
  var d = getDimensions(node);

  return {
    width: d.width - d.paddingLeft - d.paddingRight - pseudoElementWidth,
    // vertical issue due to CSS margin collapse
    height: d.height - d.paddingTop - d.paddingBottom
  }
}

function getUsedSpace(children) {
  return children
    .reduce(function (previous, current) {
      var style = window.getComputedStyle(current);

      var dimensions = {
        height: previous.height + parseInt(style.marginLeft) + parseInt(style.marginRight),
        width: previous.width + parseInt(style.marginLeft) + parseInt(style.marginRight)
      };
      
      // don't calc flex elements
      if (!current.hasAttribute('flex')) {
        // get bounds instead of offset in case of transforms
        var bounds = current.getBoundingClientRect();
        dimensions.height += bounds.height;        
        dimensions.width += bounds.width;
      }

      return dimensions;
    }, { width: 0, height: 0 });
}

function getNegativeSpace(availableSpace, usedSpace) {
  return {
    width: Math.floor(availableSpace.width - usedSpace.width),
    height: Math.floor(availableSpace.height - usedSpace.height)
  };
}

module.exports = {
  getDimensions: getDimensions,
  getUsedSpace: getUsedSpace,
  getAvailableSpace: getAvailableSpace,
  getNegativeSpace: getNegativeSpace
}