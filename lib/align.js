'use strict';

module.exports = function (childObjects, availableSpace, mainAxis) {
  return childObjects
    .map(function ({ ref }) {
      var layout = ref.getDimensions();
      availableSpace -= layout.leadingMargin(mainAxis);
      availableSpace -= layout.trailingMargin(mainAxis);
    });
}
