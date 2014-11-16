<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>layout-attributes-mixin</title>
  <link rel="stylesheet" href="../component-lib.css">
  <!-- JSXTransformer -->
  <script src="../react/JSXTransformer.js"></script>
  <!--[if IE 9]>
  <link rel="stylesheet" href="../component-lib.ie9.css">
  <script src="../es5-shim/es5-shim.js"></script>
  <script src="../es5-shim/es5-sham.js"></script>
  <script src="../console-polyfill/index.js"></script>
  <![endif]-->
  <style>

    body {
      font-size: 14px;
      margin: 0;
      padding: 2rem;
    }

    fieldset {
      border: 1px solid #ccc;
      margin-bottom: 2rem;
    }

    fieldset legend {
      background: #fff;
      border: 1px solid;
      color: #333;
      font-weight: normal;
      padding: 0 4px;
    }

    fieldset > div {
      background-color: #ccc;
      margin: 1em;
    }

    .demo {
      background-color: #ccc;
      padding: 0.5em;
      margin: 1em;
    }

    .demo > div {
      background-color: white;
      padding: 1em;
      margin: 0.5em;
    }

    .demo[vertical] { height: 350px; }

    .tall { height: 120px; }
  </style>
</head>
<body>
  
  <h1>Layout attributes <small>(declarative flex-box)</small></h1>

  <div id="react"></div>

  <script src="../react/react-with-addons.min.js"></script>
  <script src="../component-lib.js"></script>

  <script type="text/jsx:harmony=true">
    /** @jsx React.DOM */

    var LayoutAttributesMixin = require('layout-attributes-mixin/layout-attributes-mixin');

    var ControllerView = React.createClass({

      mixins: [LayoutAttributesMixin],

      render: function() {
        return (
          <div>
            <fieldset>
              <legend>Layout Attributes</legend>

              <div>Before <span>[A Span]</span> After</div>
              <div>Before <span block>[A Block Span]</span> After</div>
              <div>Hidden: <span hidden>Not displayed!</span></div>
              <div relative style={{ height: 100 }}>
                <div fit style={{ backgroundColor: '#000', color: 'white' }}>Fit</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Horizontal</legend>

              <div horizontal layout className="demo">
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
              </div>

              <div horizontal layout className="demo">
                <div>One</div>
                <div flex>Two</div>
                <div>Three</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Vertical</legend>

              <div vertical layout className="demo">
                <div>One</div>
                <div flex>Two</div>
                <div>Three</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Size</legend>

              <div horizontal layout className="demo">
                <div flex three>three</div>
                <div flex>one</div>
                <div flex two>two</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Align (IE9 not supported)</legend>

              <div horizontal layout start className="demo tall">
                <div>start</div>
                <div>start</div>
                <div>start</div>
                <div>start</div>
              </div>

              <div horizontal layout center className="demo tall">
                <div>center</div>
                <div>center</div>
                <div>center</div>
                <div>center</div>
              </div>

              <div horizontal layout end className="demo tall">
                <div>end</div>
                <div>end</div>
                <div>end</div>
                <div>end</div>
              </div>

              <div horizontal layout className="demo tall">
                <div>stretch (default)</div>
                <div>stretch (default)</div>
                <div>stretch (default)</div>
                <div>stretch (default)</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Justification (IE9 not supported)</legend>

              <div horizontal layout start-justified className="demo">
                <div>start-justified</div>
                <div>start-justified</div>
                <div>start-justified</div>
              </div>

              <div horizontal layout center-justified className="demo">
                <div>center-justified</div>
                <div>center-justified</div>
                <div>center-justified</div>
              </div>

              <div horizontal layout end-justified className="demo">
                <div>end-justified</div>
                <div>end-justified</div>
                <div>end-justified</div>
              </div>

              <div horizontal layout justified className="demo">
                <div>justified</div>
                <div>justified</div>
                <div>justified</div>
              </div>

              <div horizontal layout around-justified className="demo">
                <div>around-justified</div>
                <div>around-justified</div>
                <div>around-justified</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Self align (IE9 not supported)</legend>

              <div horizontal layout className="demo tall">
                <div flex self-start>self-start</div>
                <div flex self-center>self-center</div>
                <div flex self-end>self-end</div>
                <div flex self-stretch>start-stretch</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Self order</legend>

              <div horizontal layout className="demo">
                <div flex self-two>1: self-two</div>
                <div flex self-four>2: self-four</div>
                <div flex self-three>3: self-three</div>
                <div flex self-one>4: self-one</div>
              </div>

              <div horizontal layout className="demo">
                <div flex self-three>1: self-three</div>
                <div flex>2: undefined</div>
                <div flex>3: undefined</div>
                <div flex self-one>4: self-one</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Wrapping (IE9 not supported)</legend>

              <div horizontal layout wrap style={{ width: 220 }} className="demo">
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
                <div>Four</div>
                <div>Five</div>
                <div>Six</div>
                <div>Seven</div>
                <div>Eight</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Reverse</legend>
              <div horizontal layout reverse className="demo">
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
              </div>
            </fieldset>
          </div>
        );
      }
    });
    
    React.renderComponent(
      <ControllerView />,
      document.querySelector('#react')
    );
  </script>

</body>
</html>