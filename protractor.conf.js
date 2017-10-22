exports.config = {
    framework: "jasmine",
    baseURL: "http://localhost:8080/",
    specs: [ "test/e2e/**/*.js"],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--disable-web-security', '--user-data-dir=~/.e2e-chrome-profile']
        }
    },
};