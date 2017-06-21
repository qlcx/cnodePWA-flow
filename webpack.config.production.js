const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  
  devtool: 'source-map',
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: resolve(__dirname, 'src/styles'),
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?modules&localIdentName=[name]___[local]',
          ]
        }),
      },
      {
        test: /\.css$/,
        include: resolve(__dirname, 'src/styles'),
        use: ExtractTextPlugin.extract(['css-loader']),
      },
    ]
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('styles.css'),
  ],
}