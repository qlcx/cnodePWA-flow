const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const config = {
  entry: {
    app: ['babel-polyfill', path.join(paths.appSrc, 'index')]
  },
  output: {
    path: paths.appDist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },{
      test: /\.(jpg|png|jpeg)/,
      use: [
        'url-loader',
      ]
    },{
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.appSrc, 'index.html')
    })
  ]
};

module.exports = config;