'use strict';

var React = require('react/react');
// var AttributeReflectionMixin = require('attribute-reflection-mixin/attribute-reflection-mixin');
var styleSupport = require('./src/style-support');

var dimensions = require('./src/dimensions');
var flexbox = require('./src/flexbox');

var utils = require('./src/utils');
var toArray = utils.toArray;
var cleanArray = utils.cleanArray;

var EventEmitter = require('eventEmitter/EventEmitter');
var Emitter = new EventEmitter();

var RESIZE_EVENT = 'resize';

var LAYOUT_ATTRIBUTES = [
    'block',
    'hidden',
    'relative',
    'fit',
    'flex',
    'auto',
    'none',
    'layout',
    'horizontal',
    'vertical',
    'reverse',
    'wrap',
    'wrap-reverse'
  ].
  concat(flexbox.LAYOUT_ATTRIBUTES);

var flexboxSupport = (function () {
  return styleSupport('flexWrap', 'wrap');
})();

// add resize listener for unsupported browsers
if (!flexboxSupport) {
  window.addEventListener(RESIZE_EVENT, function (event) {
    Emitter.emitEvent(RESIZE_EVENT);
  });
}

var LayoutAttributesMixin = {

  mixins: [AttributeReflectionMixin],

  componentWillMount() {
    this.attrs = (this.attrs || []).concat(LAYOUT_ATTRIBUTES);
    if (!flexboxSupport) this._preRender();
  },

  componentDidMount() {
    if (!flexboxSupport) {
      this._postRender();
      if (this._flexListener) Emitter.removeListener(this._flexListener);
    }
  },

  _flexListener: null,

  _preRender() {
    if (Array.isArray(this.props.children)) {
      // order children
      this.props.children = flexbox.order(this.props.children);
    }
  },

  _postRender() {
    var node = this.getDOMNode();
    var children = toArray(node.childNodes);
    var props = this.props;

    // hide
    if (props.layout) {
      node.setAttribute('unresolved', '');
    }

    if (props.layout) {

      var flexChildren = children
        .filter(child => {
          return child.hasAttribute('flex');
        });

      if (flexChildren.length) {
        var resize = flexbox.flex.bind(null, flexChildren, !!props.horizontal);
        var align = flexbox.align.bind(null, this, !!props.horizontal);
        var justify = flexbox.justify.bind(null, this, !!props.horizontal);

        this._flexListener = function () {
          var containedSpace = dimensions.getAvailableSpace(node);
          var consumedSpace = dimensions.getUsedSpace(children);
          var negativeSpace = dimensions.getNegativeSpace(containedSpace, consumedSpace);
          resize(negativeSpace);
          align(negativeSpace);
          justify(negativeSpace);
        };

        this._flexListener();
        Emitter.addListener(RESIZE_EVENT, this._flexListener);
      }
    } else {
      // if (props['around-justified']) {
      //   var spaces = children.length + 1;
      //   children.forEach(el => {
      //     el.style.marginLeft = negativeSpace.width / spaces + 'px';
      //   });
      // }
    }
  }
};

var Components = {};

Object.keys(React.DOM).forEach(function (tag) {
  if (tag == 'injection') return;
  var base = React.DOM[tag];
  Components[tag] = React.createClass({
    mixins: [LayoutAttributesMixin],
    render() {
      return this.transferPropsTo(base(null, this.props.children));
    }
  });
});

// React.DOM.injection.injectComponentClasses(Components);

module.exports = LayoutAttributesMixin;
