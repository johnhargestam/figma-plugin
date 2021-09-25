const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  context: __dirname,
  entry: {
    ui: './src/ui/index.ts',
    plugin: './src/plugin/main.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              projectReferences: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, 'assets/'),
      '@shared': path.resolve(__dirname, 'src/shared/'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './mock/index.pug',
      filename: 'index.html',
      inject: false,
      cache: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      runtime: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './assets/manifest.json', to: './'}],
    }),
  ],
};
