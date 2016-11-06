/* eslint-disable flowtype/require-valid-file-annotation */

const electron = require('electron');

module.exports = (config) => {
  process.env.NODE_ENV = 'test';

  config.set({
    browsers: [electron],
    frameworks: ['mocha', 'sinon'],
    reporters: process.env.CI === 'true' ? ['junit', 'coverage'] : ['progress', 'coverage'],
    files: [
      'support/karma.js',
      'lib/**/*.test.js',
      'modules/**/*.test.js',
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
        root: `${__dirname}/modules`,
      },
      module: {
        loaders: [
          { test: /\.json$/, loader: 'json' },
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['power-assert'], plugins: ['istanbul'] } },
          { test: /\.glsl$/, loader: 'raw' },
          { test: /\.(jpe?g|png|gif|svg)$/, loaders: ['url', 'img?minimize'] },
        ],
      },
    },
    junitReporter: {
      outputDir: process.env.CIRCLE_TEST_REPORTS,
      outputFile: 'karma.xml',
      useBrowserName: false,
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report' },
        { type: 'text', subdir: '.', file: 'coverage.txt' },
        { type: 'text-summary' },
      ],
    },
  });
};
