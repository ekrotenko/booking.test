'use strict';

class SearchForm {
    constructor() {
        this.form = element(by.xpath('//form[.//select[@id="no_rooms"]]'));
        this.placeTextField = this.form.$('#ss');
        this.dateFromField = this.form.$('.--checkin-field');
        this.dateToField = this.form.$('.--checkout-field');
        this.submitButton = this.form.$('button[type="submit"]');
    }

    /**
     * returns calendar element of specific parent dateField
     *
     * @param parentField
     * @returns {ElementFinder|*}
     */
    getCalendar(parentField) {
        parentField.click();
        return parentField.$('.c2-calendar');
    }

    /**
     * selects specific date
     *
     * @param parentField - date field to be filled
     * @param date - date to be set to date field
     */
    selectDate(parentField, date) {
        const dateArr = date.split('/');
        const day = dateArr[0];
        const month = dateArr[1];
        const year = dateArr[2];
        const calendar = this.getCalendar(parentField);
        const monthElement = calendar.element(by.xpath(`.//table[contains(.,'${month} ${year}')]`));
        monthElement.element(by.xpath(`.//td[.='${day}']`)).click();
    }

    /**
     * performs search from search data
     *
     * @param searchData
     */
    search(searchData) {
        ptorHelper.clearAndSetValue(this.placeTextField, searchData.city);
        this.selectDate(this.dateFromField, searchData.startDate);
        this.selectDate(this.dateToField, searchData.endDate);
        this.submitButton.click();
    }
}

module.exports = SearchForm;