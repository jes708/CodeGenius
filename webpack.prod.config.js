'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style?sourceMap', 'css!sass?sourceMap')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css", {allChunks: true}),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
}
