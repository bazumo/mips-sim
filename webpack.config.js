'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/client/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      /* Babel */ { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      /* CSS */ { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      /* Files */ { test: /\.(png|jpg|gif|svg)$/, use: [ { loader: 'url-loader', options: { limit: 8192 } } ] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    })
  ],
  resolve: {
      alias: {
        'assembler': path.resolve(__dirname, 'src/assembler'),
        'client': path.resolve(__dirname, 'src/client'),
        'server': path.resolve(__dirname, 'src/server'),
        'simulator': path.resolve(__dirname, 'src/simulator'),
        'test': path.resolve(__dirname, 'src/test'),
        'architecture': path.resolve(__dirname, 'src/architecture'),
      }
  }
};

module.exports = function(env) {
  if (env === undefined) env = {};


  if (!env.production) {
    config.mode = 'development';
    config.plugins.push(
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify('development')
          }
      })
    );
    console.log("Development mode enabled in webpack.config.js. Make sure to disable this in production builds (by using the --env.production Webpack command line argument)");
  }



  return config;
}
