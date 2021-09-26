const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    ui: {
      import: './src/ui/index.ts',
      filename: 'build/[name].js',
    },
    plugin: {
      import: './src/plugin/main.ts',
      filename: 'dist/[name].js',
    },
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
    publicPath: '',
    path: __dirname,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/index.pug',
      filename: './dist/index.html',
      chunks: ['ui'],
      inject: false,
      cache: false,
    }),
    new MiniCssExtractPlugin({
      filename: './build/[name].css',
      runtime: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './assets/manifest.json', to: './dist/'}],
    }),
  ],
};
