'use strict';
exports.config = {
    directConnect: true,
    baseUrl: 'https://booking.com',

    multiCapabilities: [{
        'browserName': 'chrome',
        chromeOptions: {
            args: [
                '--disable-extensions',
                '--start-maximized',
                'lang=en-US'
            ]
        }
    }],

    allScriptsTimeout: 60000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000,
        isVerbose: true,
        // remove `dots` reporter
        print: () => {
        }
    },

    suites: {
        searchCity: './tests/search.city.spec.js'
    },

    onPrepare: () => {
        global.faker = require('faker');
        global.using = require('jasmine-data-provider');
        global.ptorHelper = require('protractor-helpers');
        global.projectDir = process.cwd();
        global.mainHelper = require(`${process.cwd()}/helpers/main.helper`);

        global.data = require(`${projectDir}/data`);
        global.pages = require(`${projectDir}/pages`).container.FrontendPageObject.getFrontendPages();

        // add jasmine spec reporter
        const specReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new specReporter());

        // Store the name of the browser that's currently being used.
        browser.getCapabilities().then(caps => {
            browser.params.browser = caps.get('browserName');
        });

        // disable animations
        browser.addMockModule('disableNgAnimate', function () {
            angular
                .module('disableNgAnimate', [])
                .run(['$animate', function ($animate) {
                    $animate.enabled(false);
                }]);
        });
        browser.addMockModule('disableCssAnimate', function () {
            angular
                .module('disableCssAnimate', [])
                .run(function () {
                    let style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML =
                        '*{-webkit-transition:none!important;' +
                        '-moz-transition:none!important;' +
                        '-o-transition:none!important;' +
                        '-ms-transition:none!important;' +
                        'transition:none!important}';

                    document.getElementsByTagName('head')[0].appendChild(style);
                });
        });
    },

    framework: 'jasmine'
};