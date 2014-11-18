'use strict';

// Based on https://github.com/rackt/react-router/blob/master/webpack.config.js

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var EXAMPLES_DIR = path.resolve(__dirname, 'examples');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

function buildEntries() {
  return fs.readdirSync(EXAMPLES_DIR).reduce(function(entries, dir) {
    if (dir === 'build') {
      return entries;
    }

    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir))) {
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'index.jsx');
    }

    return entries;
  }, {});
}

module.exports = {

  entry: buildEntries(),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: EXAMPLES_DIR + '/__build__',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'jsx-loader?harmony'
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
      } 
    ]
  },
  
  resolve: {
    alias: {
      'react-layout': '../../lib/index'
    },
    extensions: ['', '.js', '.jsx', '.css']
  },

  externals: [
    { 'react': 'React' }
  ],

  devtool: "sourcemap",  

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]

};