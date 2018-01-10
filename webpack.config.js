const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://192.168.2.146:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  // 映射源码
  devtool: 'source-map',

  devServer: {
    hot: true,
    // https: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    compress: true,
    host: '192.168.2.146',
    public: '192.168.2.146:8080',
    proxy: {
      '/cnodejs/**': {
        target: 'https://cnodejs.org',
        pathRewrite: {'^/cnodejs': ''},
        changeOrigin: true,
      }
    }
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: resolve(__dirname, 'src/'),
    },{
      test: /\.(jpg|png|jpeg)/,
      use: [
        'url-loader',
      ]
    },{
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader'
    },{
      test: /\.css$/,
      exclude: resolve(__dirname, 'src/styles'),
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]___[local]?sourceMap',
      ]
    },{
      test: /\.css$/,
      include: resolve(__dirname, 'src/styles'),
      use: [
        'style-loader',
        'css-loader?sourceMap'
      ]
    }]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}