'use strict';

module.exports = function (availableSpace, usedSpace) {
  return {
    width: Math.floor(availableSpace.width - usedSpace.width),
    height: Math.floor(availableSpace.height - usedSpace.height)
  };
}
