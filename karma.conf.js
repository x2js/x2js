/* eslint indent: [2, 4] */
module.exports = function karmaExports(config) {
    "use strict";

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        "basePath": '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        "frameworks": ['qunit'],

        // list of files / patterns to load in the browser
        "files": [
            'x2js.js',
            'tests*.js'
        ],

        // list of files to exclude
        "exclude": [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        "preprocessors": {
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // 'progress' reports wrong totals on Travis CI, so just use dots
        "reporters": ['dots'],

        // web server port
        "port": 9876,

        // enable / disable colors in the output (reporters and logs)
        "colors": true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        "logLevel": config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        "autoWatch": true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        "browsers": ['Chrome', 'IE', 'Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        "singleRun": false,

        // Concurrency level
        // how many browser should be started simultanous
        "concurrency": Infinity
    });
};