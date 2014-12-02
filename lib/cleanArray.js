'use strict';

module.exports = function (arr) {
  var results = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (arr[i]) results.push(arr[i]);
  }
  return results;
}
