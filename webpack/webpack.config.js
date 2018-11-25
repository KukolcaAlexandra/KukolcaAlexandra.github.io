const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['whatwg-fetch', '@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[name][chunkhash].js',
    library: '[name]',
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: [
          { loader: 'my-loader' },
        ],
      },
    ],
  },

  plugins: [
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
  },
};
