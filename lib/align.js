'use strict';

module.exports = function (childObjects, availableSpace, mainAxis) {
  return childObjects
    .map(function ({ layout }) {
      availableSpace -= layout.leadingMargin(mainAxis);
      availableSpace -= layout.trailingMargin(mainAxis);
    });
}
