const {merge} = require('webpack-merge')
const {common} = require('./webpack.common')
const nodeExternals = require('webpack-node-externals')
const WebpackHookPlugin = require('webpack-hook-plugin')

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  plugins: [new WebpackHookPlugin({
    onBuildEnd: ['npm run run:dev']
  })],
  externals: [nodeExternals()],
})