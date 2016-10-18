const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const debug = process.env.NODE_ENV === 'development';
const optimize = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
];

if (optimize) {
  plugins.push(new BabiliPlugin());
}

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-source-map' : null,
  target: 'electron',
  entry: {
    main: ['./lib/support/webpack', './lib/main'],
    renderer: ['./lib/support/webpack', './lib/renderer'],
  },
  output: {
    filename: '[name].bundle.js',
    path: './app/assets',
    pathinfo: debug,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  node: {
    __dirname: false,
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.(jpe?g|png|gif|svg)$/, loaders: ['url', 'img?minimize'] },
    ],
  },
  plugins,
};
