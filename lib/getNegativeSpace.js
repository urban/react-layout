'use strict';

module.exports = function (availableSpace, usedSpace) {
  return {
    height: Math.floor(availableSpace.height - usedSpace.height),
    width: Math.floor(availableSpace.width - usedSpace.width)
  };
}
