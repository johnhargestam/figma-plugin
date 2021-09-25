const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');

module.exports = (_, argv) => ({
  mode: argv.mode === 'development' ? 'development' : 'production',
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,
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
    alias: {
      '@assets': path.resolve(__dirname, 'assets/'),
      '@shared': path.resolve(__dirname, 'src/shared/'),
    },
  },
  output: {
    path: __dirname,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/ui.pug',
      filename: './dist/ui.html',
      chunks: ['ui'],
      inject: false,
      cache: false,
    }),
    new MiniCssExtractPlugin({
      runtime: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './assets/manifest.json', to: './dist/'}],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        build: true,
        vue: true,
      },
    }),
  ],
});
