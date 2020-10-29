const dotenv = require('dotenv').config()
const webpack = require("webpack")
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => ({
  entry: './src',
  mode: 'production',
  target: 'node',
  watch: argv.mode === 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
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
})