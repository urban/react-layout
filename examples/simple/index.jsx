'use strict';

require('normalize.css/normalize.css');
require('./styles.css');

var React = require('react');
var Layout = require('react-layout');
Object.assign = require('object-assign');

var styles = {
  block: {
    backgroundColor: 'white',
    padding: '1em',
    margin: '0.5em'
  },
  vertical: {
    height: 250
  }
}

var horizontalTest = (
  <fieldset>
    <legend>Horizontal</legend>

    <Layout horizontal>
      <div>One</div>
      <div flex>Two</div>
      <div>Three</div>
    </Layout>

  </fieldset>
);

var verticalTest = (
  <fieldset style={ styles.vertical }>
    <legend>Vertical</legend>
    <Layout vertical>
      <div>One</div>
      <div flex>Two</div>
      <div>Three</div>
    </Layout>
  </fieldset>
);

var sizeTest = (
  <fieldset>
    <legend>Size</legend>

    <Layout horizontal layout>
      <div flex three>three</div>
      <div flex>one</div>
      <div flex two>two</div>
    </Layout>
  </fieldset>
);

var orderTest = (
  <fieldset>
    <legend>Self order</legend>

    <Layout horizontal layout>
      <div flex self-two>1: self-two</div>
      <div flex self-four>2: self-four</div>
      <div flex self-three>3: self-three</div>
      <div flex self-one>4: self-one</div>
    </Layout>

    <Layout horizontal layout>
      <div flex self-three>1: self-three</div>
      <div flex>2: undefined</div>
      <div flex>3: undefined</div>
      <div flex self-one>4: self-one</div>
    </Layout>
  </fieldset>
);

class Application {

  render() {
    return (
      <div>
        { horizontalTest }
      </div>
    );
  }

}

var ApplicationTag = React.createClass(Application.prototype);

if (typeof window !== 'undefined') {
  React.render(
    <ApplicationTag />,
    document.querySelector('#react')
  );
}

module.exports = ApplicationTag;
