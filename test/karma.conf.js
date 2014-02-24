module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '..',

        frameworks: ['jasmine'],

        files: [
            'app/lib/angular/angular.js',
            'app/lib/angular-resource/angular-resource.js',
            'app/lib/angular-mocks/angular-mocks.js',
            'app/lib/sinonjs-built/pkg/sinon.js',
            'app/js/*.js',
            'test/unit/*Spec.js'
        ],

        exclude: ['test/karma.conf.js'],

        //pre-processor for collecting code coverage
        preprocessors: {
            'app/js/*.js': 'coverage'
        },

        // test results reporter to use
        // report on progress, collect coverage and junit reports
        reporters: ['progress', 'coverage', 'junit'],

        //use cobertura coverage report for jenkins integration
        coverageReporter: {
            reporters: [
                {
                    type: 'cobertura',
                    dir: 'test-results/'
                },
                {
                    type: 'html',
                    dir: 'test-results/'
                }
            ]
        },

        //collect junit report for jenkins integration
        junitReporter: {
            outputFile: 'test-results/junit.xml',
            suite: ''
        },

        // web server port
        port: process.env['KARMA_PORT'] || 8100,

        // cli runner port
        runnerPort: process.env['KARMA_RUNNER_PORT'] || 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: process.env['KARMA_COLORS'] || true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari
        // - PhantomJS
        browsers: [process.env['KARMA_BROWSER'] || 'PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    })
};