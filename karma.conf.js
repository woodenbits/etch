const electron = require('electron');

module.exports = (config) => {
  process.env.NODE_ENV = 'test';

  config.set({
    browsers: [electron],
    frameworks: ['mocha', 'sinon'],
    reporters: ['progress', 'coverage'],
    files: [
      'lib/support/karma.js',
      'lib/**/*.test.js',
    ],
    preprocessors: {
      'lib/**/*.test.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      context: __dirname,
      devtool: 'inline-source-map',
      target: 'electron',
      externals: {
        mocha: 'Mocha',
        sinon: 'sinon',
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      module: {
        loaders: [
          { test: /\.json$/, loader: 'json' },
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['power-assert'], plugins: ['istanbul'] } },
          { test: /\.(jpe?g|png|gif|svg)$/, loaders: ['url', 'img?minimize'] },
        ],
      },
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report' },
        { type: 'text', subdir: '.', file: 'coverage.txt' },
        { type: 'text-summary' },
      ],
    }
  });
};
