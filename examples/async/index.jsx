'use strict';

require('normalize.css/normalize.css');
require('./styles.css');

var React = require('react');
var Layout = require('react-layout');
// Object.assign = require('object-assign');

var styles = {
  block: {
    backgroundColor: 'white',
    padding: '1em',
    margin: '0.5em'
  },
  vertical: {
    height: 250
  }
};


class Application {

  getInitialState() {
    return { value: 'TEST' };
  }

  render() {
    var { value } = this.state;

    return (
      <div>
        <fieldset>

          <Layout horizontal>
            <div>One</div>
            <div flex>Two</div>
            <div>{ value }</div>
          </Layout>

          <Layout horizontal>
            <div>One</div>
            <div>{ value }</div>
          </Layout>

          <input type="text" value={ value } onChange={ this.handleChange } />

        </fieldset>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value.substr(0, 140) });
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
