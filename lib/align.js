'use strict';

var getDimensions = require('./getDimensions');

module.exports = function (childObjects, area, isHorizontal) {
  if (!childObjects.length) return;

  var dimension = !isHorizontal ? 'width' : 'height';
  var size = area[dimension];

  return childObjects
    .map(function ({ node }) {
      var dimensions = getDimensions(node);
      if (!isHorizontal) {
        size -= dimensions.marginLeft + dimensions.marginRight;
      } else {
        size -= dimensions.marginTop + dimensions.marginBottom;
      }
    })

}
