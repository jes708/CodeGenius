'use strict'

module.exports = {
  devtool: 'eval-source-map',
  entry: ['./browser/js/app.js'],
  output: {
    path: __dirname + '/public',
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      // { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  }
}
