module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    client: {
      captureConsole: false,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
    ],
    proxies: {
      "/assets/": "/base/src/assets/"
    },
    preprocessors: {
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },
    webpack: testWebpackConfig,
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: [ 'Chrome' ],
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = [ 'ChromeTravisCi' ];
  }

  config.set(configuration);
};
