const path = require('path')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui.ts',
    code: './src/code.ts',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', include: path.join(__dirname, 'src'), exclude: /node_modules/ },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [],
})
