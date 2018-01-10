const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths = require('./paths')
const webpackBaseConfig = require('./webpack.config.base')

const config = webpackMerge(webpackBaseConfig, {
  entry: {
    vendor: ['react', 'react-dom', 'axios', 'bluebird', 'moment', 'redux']
  },
  module: {
    rules: [{
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },{
      test: /\.css$/,
      exclude: path.resolve(paths.appSrc, './styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?modules&localIdentName=[name]__[local]',
        ]
      })
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          keep_fnames: true
        },
        compress: {
          warnings: false,
          drop_console: true
        },
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
      minChunks: function(module){
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: '[name].[chunkhash].js',
      minChunks: ['vendor']
    }),
    new ExtractTextPlugin('styles.css')
  ]
})

module.exports = config