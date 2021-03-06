const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NodePolyfillplugin = require('node-polyfill-webpack-plugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index_bundle.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['react-refresh/babel'],
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new CopyPlugin({
      patterns: [{ from: './public/static' }],
    }),

    new NodePolyfillplugin(),

    new RefreshWebpackPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    static: { directory: path.resolve(__dirname, 'dist') },
  },
};
