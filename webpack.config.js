const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    compress: true,    
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },{
      test: /\.css$/,
      exclude: '/src/styles',
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]___[local]?sourceMap=true',
      ]
    }, {
      test: /\.css$/,
      include: '/src/styles',
      use: [
        'style-loader',
        'css-loader?sourceMap=true',
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}