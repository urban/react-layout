'use strict';

var fs = require('fs');
var resolve = require('path').resolve;
var join = require('path').join;
var exists = require('fs').existsSync;
var webpack = require('webpack');

var EXAMPLES_DIR = resolve(__dirname, '../examples');
var BUILD_DIR = 'build';

module.exports = require('./make-webpack-config')({

  entry: entriesArray(),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: join(EXAMPLES_DIR,  BUILD_DIR),
    publicPath: '/' + BUILD_DIR + '/'
  },

  alias: {
    'react-layout': '../../lib/Layout'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]
});

function entriesArray() {
  return fs.readdirSync(EXAMPLES_DIR).reduce(entriesSum, {});
}

function entriesSum(entries, dir) {
  var isBuildDir = dir === BUILD_DIR;
  var file = join(EXAMPLES_DIR, dir, 'index.jsx');
  if (!isBuildDir && isDirectory(join(EXAMPLES_DIR, dir)) && exists(file)) {
    entries[dir] = file;
  }
  return entries;
}

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}
