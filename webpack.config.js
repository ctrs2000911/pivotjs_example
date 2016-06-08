const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const colorRebeccapurple = require('postcss-color-rebeccapurple');

module.exports = [
  {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
      './index',
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('style.css', { allChunks: true }),
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
          ),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader'
          ),
        },
      ],
    },
    postcss: [
      autoprefixer,
      colorRebeccapurple,
    ],
  },
];
