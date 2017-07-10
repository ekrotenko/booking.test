'use strict';

class SearchResultPage {
    constructor(searchForm) {
        this.searchForm = searchForm;
        this.resultSet = $('#hotellist_inner');
        this.hotelsList = this.resultSet.all(by.xpath('./div[@data-hotelid]'));
    }

    /**
     * returns location of specific hotel item from result set
     *
     * @param item - item webelement
     * @returns {*}
     */
    getLocationOfItem(item) {
        return item.$('.address .district_link').getText();
    }
}

module.exports = SearchResultPage;