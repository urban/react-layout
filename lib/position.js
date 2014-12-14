'use strict';

var pos = {
  row: 'left',
  column: 'top'
};

var dim = {
  row: 'width',
  column: 'height'
};

module.exports = function (childObjects, mainAxis, crossAxis) {
  var mainPos = 0;
  childObjects
    .forEach(function ({ style, layout }) {
      style[pos[crossAxis]] = layout.leadingMargin(crossAxis);
      mainPos += layout.leadingMargin(mainAxis);
      style[pos[mainAxis]] = mainPos;
      mainPos += style[dim[mainAxis]] || layout[dim[mainAxis]];
      mainPos += layout.trailingMargin(mainAxis);
    });
}
