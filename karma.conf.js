// Karma configuration
// Generated on Mon Mar 23 2015 07:31:02 GMT+0200 (EET)
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function (config) {
  const webpackConfig = makeWebpackConfig({
    devtool: 'inline-source-map',
    separateStylesheet: true,
    debug: true,
    cover: process.env.COVERAGE,
  });

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/index.test.js',
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.test.js': ['webpack', 'sourcemap'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: process.env.COVERAGE
      ? ['progress', 'coverage-istanbul']
      : ['progress'],

    coverageIstanbulReporter: {
      reports: [
        'text-summary',
        'lcov',
        'json',
      ],
      fixWebpackSourcePaths: true,
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true,
    },

    plugins: [
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
    ].concat(
      process.env.COVERAGE
        ? [require('karma-coverage-istanbul-reporter')]
        : []
    ),
  });
};
