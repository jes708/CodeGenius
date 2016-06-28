'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: ['./browser/js/app.js', './browser/scss/main.scss'],
  output: {
    path: __dirname + '/public',
    filename: 'main.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presents: ['es2015', 'react']} },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style?sourceMap', 'css!sass?sourceMap')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css", {allChunks: true})
  ]
}
