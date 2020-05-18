const path = require('path');
let fs = require('fs');
require('protractor-multiple-cucumber-html-reporter-plugin');
exports.config = {
    directConnect: true,
    chromeDriver: './chromedriver.exe',
    capabilities: {
        browserName: 'chrome'
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        './src/features/*.feature'
    ],
    getPageTimeout: 90000,
    allScriptsTimeout: 3000000,

    onPrepare() {

        require('ts-node').register({
            project: './tsconfig.json'
        });

        by.addLocator('css_sr', (cssSelector, opt_parentElement, opt_rootSelector) => {
            let selectors = cssSelector.split('::sr');
            if (selectors.length === 0) {
                return [];
            }

            let shadowDomInUse = (document.head.createShadowRoot || document.head.attachShadow);
            let getShadowRoot = (el) => ((el && shadowDomInUse) ? el.shadowRoot : el);
            let findAllMatches = (selector, targets, firstTry) => {
                let using, i, matches = [];
                for (i = 0; i < targets.length; ++i) {
                    using = (firstTry) ? targets[i] : getShadowRoot(targets[i]);
                    if (using) {
                        if (selector === '') {
                            matches.push(using);
                        } else {
                            Array.prototype.push.apply(matches, using.querySelectorAll(selector));
                        }
                    }
                }
                return matches;
            };

            let matches = findAllMatches(selectors.shift().trim(), [opt_parentElement || document], true);
            while (selectors.length > 0 && matches.length > 0) {
                matches = findAllMatches(selectors.shift().trim(), matches, false);
            }
            return matches;
        });
        params: {
            expectedConditionLargeTimeLimit = '70000',
            expectedConditionShortTimeLimit = '30000'
        }



    },
    cucumberOpts: {
        require: [
            './src/steps/*.ts'
        ],
        tags: [],
        strict: true,
        format: [],
        'dry-run': false,
        compiler: [],
        format: 'json:.tmp1/results.json',
    },
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            displayDuration: true,
            duratinInMS: true,
            customData: {
                title: 'Run info',
                data: [{
                        label: 'Project',
                        value: 'Alagappan - Testing Cucumber'
                    },
                    {
                        label: 'Release',
                        value: '1.0.0'
                    },
                    {
                        label: 'Cycle',
                        value: 'Cycle1'
                    }
                ]
            },
            metadata: [
                {name: 'Environment v.', value: '12.3'},
                {name: 'Plugin v.', value: '32.1'},
                {name: 'Variable set', value: 'Foo'}
            ]
        }
    }]
    



};