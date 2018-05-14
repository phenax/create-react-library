
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './example/src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'example.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  stats: {
    colors: true
  },
};
