'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ['@babel/polyfill', './src/client/index.js'],
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      util: require.resolve("util/")
    }
  },
  module: {
    rules: [
      /* Babel */ {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      /* CSS */ {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      /* Files */ {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{ loader: 'url-loader', options: { limit: 8192 } }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    })
  ],
  resolve: {
    alias: {
      assembler: path.resolve(__dirname, 'src/assembler'),
      client: path.resolve(__dirname, 'src/client'),
      server: path.resolve(__dirname, 'src/server'),
      simulator: path.resolve(__dirname, 'src/simulator'),
      test: path.resolve(__dirname, 'src/test'),
      architecture: path.resolve(__dirname, 'src/architecture')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};

module.exports = (env, argv) => {
  if (env === undefined) env = {};

  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map',
    config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('development')
          }
        })
    );
    console.log(
        'Development mode enabled in webpack.config.js. Make sure to disable this in production builds (by using the --env.production Webpack command line argument)'
    );
  } else {
    config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {}
        })
    );
  }

  return config;
};
