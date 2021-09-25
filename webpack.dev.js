const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

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
  ],
});
