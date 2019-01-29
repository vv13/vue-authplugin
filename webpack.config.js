var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  optimization: {
    minimize: true
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    publicPath: '/lib/',
    libraryTarget: 'umd',
    library: 'vue-authplugin',
    filename: 'vue-authplugin.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: '#source-map'
};
