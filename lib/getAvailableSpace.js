'use strict';

var getDimensions = require('./getDimensions');

module.exports = function (node) {
  var pseudoElementWidth = 2;
  var d = getDimensions(node);

  return {
    width: d.width - d.paddingLeft - d.paddingRight - pseudoElementWidth,
    // vertical issue due to CSS margin collapse
    height: d.height - d.paddingTop - d.paddingBottom
  }
}
