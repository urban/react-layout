'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './index.jsx',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'jsx-loader?harmony&sourceMap'
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
      } 
    ]
  },
  plugins: [
      new ExtractTextPlugin('bundle.css')
  ],
  resolve: {
    alias: {
      'react$': require.resolve('../../node_modules/react')
    },
    extensions: ['', '.js', '.jsx']
  },
  externals: [
    {
      'react': 'React'
    }
  ]
};