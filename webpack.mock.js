const common = require('./webpack.common.js');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  entry: {
    ui: './src/ui/index.ts',
    plugin: './src/plugin/main.ts',
    shim: './mock/shim.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
});

module.exports.plugins = [
  new HtmlWebpackPlugin({
    template: './mock/index.pug',
    filename: 'index.html',
    inject: false,
    cache: false,
  }),
  new HtmlWebpackPlugin({
    template: './assets/index.pug',
    filename: 'ui.html',
    inject: false,
    cache: false,
  }),
  ...common.plugins.slice(1),
];
