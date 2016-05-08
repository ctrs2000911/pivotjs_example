const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname,
        },
      ],
    },
  },
  {
    entry: ['./app/styles/style.scss'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'style.css',
      publicPath: '/static/',
    },
    plugins: [
      new ExtractTextPlugin('style.css', { allChunks: true }),
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
        },
      ],
    },
  },
];
