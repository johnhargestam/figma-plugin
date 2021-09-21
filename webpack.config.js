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
        test: /\.ts$/, use: 'ts-loader',
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json$/, type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    path: __dirname,
    assetModuleFilename: 'dist/[name][ext]'
  },
  plugins: [],
});
