'use strict';

module.exports = function ({ layout: dim, child }) {
  var height = dim.marginTop + dim.marginBottom;
  var width = dim.marginLeft + dim.marginRight;

  // don't calc flex elements
  if (!child.props.flex) {
    height += dim.height;
    width += dim.width;
  }

  return { height, width };
}
