'use strict';

module.exports = function (children) {
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
