const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => ({
  mode: argv.mode === 'development' ? 'development' : 'production',
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,
  entry: {
    ui: {
      import: './src/ui.ts',
      filename: 'build/[name].js',
    },
    plugin: {
      import: './src/plugin.ts',
      filename: 'dist/[name].js',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: false,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    path: __dirname,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.pug',
      filename: './dist/ui.html',
      chunks: ['ui'],
      inject: false,
      cache: false,
    }),
    new MiniCssExtractPlugin({
      runtime: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './manifest.json', to: './dist/'}],
    }),
  ],
});
