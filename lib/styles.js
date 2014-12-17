'use strict';

Object.assign = require('react/lib/Object.assign');

var layout = {
  boxSizing: 'border-box',
  position: 'relative'
};

var layoutItem = {
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute'
};

var row = {
  whiteSpace: 'nowrap'
};

var column = {};

var resolved = {
  ...layoutItem
};

var unresolved = {
  ...layoutItem,
  opacity: 0,
  overflow: 'hidden'
};

module.exports = {
  layout,
  row,
  column,
  resolved: { ...layoutItem },
  unresolved: {
    ...layoutItem,
    opacity: 0,
    overflow: 'hidden'
  },
  getItemStyle
};

function getItemStyle(isResolved) {
  return isResolved ? resolved : unresolved;
}
