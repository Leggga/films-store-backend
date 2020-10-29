const dotenv = require('dotenv').config()
const webpack = require("webpack")
const paths = require("./paths");
const nodeExternals = require('webpack-node-externals')

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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    })
  ],
  externals: [nodeExternals()],
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