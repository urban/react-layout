'use strict';

require('normalize.css/normalize.css');
require('./styles.css');

var React = require('react');
var Layout = require('../../lib/index.jsx');


class Application {

  render() {
    return (
      <div>
        <fieldset className="demo">
          <legend>Horizontal</legend>

          <Layout horizontal>
            <div>One</div>
            <div flex>Two</div>
            <div>Three</div>
          </Layout>

        </fieldset>

        <fieldset className="demo vertical">
          <legend>Vertical</legend>

          <Layout vertical>
            <div>One</div>
            <div flex>Two</div>
            <div>Three</div>
          </Layout>

        </fieldset>
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