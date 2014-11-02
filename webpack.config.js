var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './lib/index.jsx',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'jsx-loader?harmony' 
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
      },
      {
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
      } 
    ]
  },
  plugins: [
      new ExtractTextPlugin("style.css")
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: [
    {
      'react': 'React'
    }
  ]
};