const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  entry: {
    main: ['babel-polyfill', './src/index.js'],
    vendor: ['react', 'react-dom', 'axios', 'bluebird', 'moment', 'redux']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: resolve(__dirname, 'src/'),
      },
      {
      test: /\.(jpg|png|jpeg)/,
        use: [
          'url-loader',
        ]
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader'
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
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
  ],
}