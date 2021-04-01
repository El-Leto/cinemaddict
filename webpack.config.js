'use strict';

const path = require('path');
const publicDir = path.resolve(__dirname, 'public');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: publicDir,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: publicDir,
    watchContentBase: true,
  }
};
