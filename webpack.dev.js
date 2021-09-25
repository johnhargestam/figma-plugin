const common = require('./webpack.common.js');
const {merge} = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        build: true,
        vue: true,
      },
    }),
    new ESLintPlugin({
      files: ['./src/'],
      extensions: ['.ts'],
    }),
  ],
});
