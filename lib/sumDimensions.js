'use strict';

module.exports = function (prev, curr) {
  return {
    height: prev.height + curr.height,
    width: prev.width + curr.width
  }
}
