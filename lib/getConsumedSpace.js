'use strict';

var getDimensions = require('./getDimensions');

module.exports = function ({ node, child }) {
  var rect = getDimensions(node);
  var height = rect.marginTop + rect.marginBottom;
  var width = rect.marginLeft + rect.marginRight;

    // don't calc flex elements
    var hasFlex = child.props.hasOwnProperty('flex');
    if (!hasFlex) {
      height += rect.height;
      width += rect.width;
    }

    return { height, width };
}
