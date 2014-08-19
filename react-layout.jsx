/** @jsx React.DOM */
import React from '../react/react';

var attrs = [
  'layout', 
  'block', 
  'hidden', 
  'relative', 
  'fit',
  'flex',
  'auto',
  'none',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'horizontal',
  'vertical',
  'reverse',
  'wrap',
  'wrap-reverse',
  'start',
  'center',
  'end',
  'start-justified',
  'center-justified',
  'end-justified',
  'around-justified',
  'self-start',
  'self-center',
  'self-end',
  'self-stretch',
  'self-one',
  'self-two',
  'self-three',
  'self-four',
  'self-five',
  'self-six',
  'self-seven',
  'self-eight',
  'self-nine',
  'self-ten',
  'self-eleven',
  'self-twelve'
];


function testStyleType(prop) {
  var testElement = document.createElement('div');
  return typeof testElement.style[prop] !== "undefined";
}

function testStyleProp(prop) {
  var support = testStyleType(prop);
  if (!support) {
    // titlecase
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    
    var prefixes = "webkit moz o ms".split(" ");
    var len = prefixes.length;
    for (var i = 0; i < len; i++) {
      support = testStyleProp(prefix[i] + prop);
      if (support) break;
    }
  }

  return support;  
}

var flexboxSupport = testStyleProp('flexWrap');

function preRenderShim() {
  var props = this.props;
  if (props.reverse) {
    this.props.children = this.props.children.reverse();
  }
}

function postRenderShim() {

}

var LayoutMixin = {
  componentDidMount: function () {
    var node = this.getDOMNode();

    if (!flexboxSupport) postRenderShim.call(this);

    attrs.forEach(function (attr) {
      if (this.props[attr]) node.setAttribute(attr, '');
    }.bind(this));
  }
};

var Components = {};

Object.keys(React.DOM).forEach(function (tag) {
  if (tag == 'injection') return;
  var base = React.DOM[tag];

  Components[tag] = React.createClass({
    mixins: [LayoutMixin],
    render: function () {
      if (!flexboxSupport) preRenderShim.call(this);
      
      return this.transferPropsTo(base(null, this.props.children));
    }
  });
});

React.DOM.injection.injectComponentClasses(Components);

export default LayoutMixin;