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
    preLoaders: [{ test: /\.jsx?$/, loaders: ['eslint'] }],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react', 'es2015']} },
      { test: /\.json$/, loader: 'json-loader' },
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
