const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'development' ? 'development' : 'production',
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,
  entry: {
    ui: './src/ui.ts',
    plugin: './src/plugin.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, use: 'ts-loader', include: path.join(__dirname, 'src'), exclude: /node_modules/,
      },
      {
        test: /\.css?$/, use: ['style-loader', 'css-loader'], include: path.join(__dirname, 'src'), exclude: /node_modules/,
      },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [],
});
