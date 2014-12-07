'use strict';

var getDimensions = require('./getDimensions');

module.exports = function (node) {
  var d = getDimensions(node);

  return {
    width: d.width - d.paddingLeft - d.paddingRight,
    height: d.height - d.paddingTop - d.paddingBottom
  }
}
