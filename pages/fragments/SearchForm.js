'use strict';

class SearchForm {
    constructor() {
        this.form = element(by.xpath('//form[.//select[@id="no_rooms"]]'));
        this.locationTextField = this.form.$('#ss');
        this.dateFromField = this.form.$('.--checkin-field');
        this.dateToField = this.form.$('.--checkout-field');
        this.submitButton = this.form.$('button[type="submit"]');
    }

    /**
     * sets the specific location with selection of best matching suggestion
     * to avoid redirection to 'Narrow search' page
     *
     * @param location
     */
    setLocation(location){
        ptorHelper.clearAndSetValue(this.locationTextField, location);
        const suggestion = this.form.element(by.xpath(`//li[starts-with(@data-label, '${location}')]`));
        ptorHelper.waitForElement(suggestion, 5000);
        suggestion.click();
        // We need this action to loose focus from selected suggestion option element:
        this.form.click();
    }

    /**
     * returns calendar element of specific parent dateField
     *
     * @param parentField
     * @returns {ElementFinder|*}
     */
    getCalendar(parentField) {
        const calendarElement = parentField.$('.c2-calendar');
        parentField.click();
        ptorHelper.waitForElement(calendarElement, 5000);
        return calendarElement;
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
        this.setLocation(searchData.city);
        this.selectDate(this.dateFromField, searchData.startDate);
        this.selectDate(this.dateToField, searchData.endDate);
        this.submitButton.click();
    }
}

module.exports = SearchForm;