const dotenv = require('dotenv').config()
const webpack = require('webpack')
const paths = require('./paths')

module.exports.common = {
  entry: paths.src,
  mode: 'production',
  target: 'node',
  output: {
    path: paths.build,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      src: paths.src,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  }
}