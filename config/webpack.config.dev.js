const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const paths = require('./paths');
const webpackBaseConfig = require('./webpack.config.base');

const hostname = process.env.HOST || '192.168.2.146';
const port = process.env.PORT || 8080;

const config = webpackMerge(webpackBaseConfig, {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(paths.appSrc, 'index')
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: [ 'style-loader', 'css-loader']
    },{
      test: /\.css$/,
      exclude: path.resolve(paths.appSrc, './styles'),
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]',
      ]
    }]
  },
  devServer: {
    contentBase: paths.appDist,
    hot: true,
    // https: true,
    compress: true,
    host: hostname,
    public: `${hostname}:${port}`,
    proxy: {
      '/cnodejs/**': {
        target: 'https://cnodejs.org',
        pathRewrite: {'^/cnodejs': ''},
        changeOrigin: true,
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 当开启HMR时使用NamedModulesPlugin可以显示模块的相对路径
    new webpack.NamedModulesPlugin()
  ]
});

module.exports = config;