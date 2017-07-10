'use strict';

class CommonHelper {
    /**
     * Clear browser session storage
     *
     */
    clearSessionStorage() {
        browser.executeScript('window.sessionStorage.clear();');
    };

    /**
     * Clear browser local storage
     *
     */
    clearLocalStorage() {
        browser.executeScript('window.localStorage.clear();');
    };

    /**
     * Clear cookies
     *
     */
    clearCookies() {
        browser.manage().deleteAllCookies();
    };

    /**
     * Clear all browser data
     *
     */
    clearAllData() {
        this.clearSessionStorage();
        this.clearLocalStorage();
        this.clearCookies();
    };
}

module.exports = new CommonHelper();