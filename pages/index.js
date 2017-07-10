'use strict';
const bottlejs = require('bottlejs').pop('test');
const fragments = require('./fragments');

bottlejs.factory('PageFragments', function () {
    return {
        getSearchForm: function () {
            return new fragments.searchForm;
        }
    };
});

bottlejs.factory('FrontendPageObject', function (container) {
    const pageFragments = container.PageFragments;
    return {
        getFrontendPages: function () {
            const frontendPages = require('./Pages');
            return new frontendPages(this.getHomePage(), this.getSearchResultPage());
        },
        getHomePage: function () {
            const homePage = require('./HomePage');
            return new homePage(pageFragments.getSearchForm());
        },
        getSearchResultPage: function () {
            const searchResultPage = require('./SearchResultPage');
            return new searchResultPage(pageFragments.getSearchForm());
        }
    }
});

module.exports = bottlejs;
