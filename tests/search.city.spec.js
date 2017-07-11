"use strict";

describe('Verify search by city', () => {
    const searchCityData = data.search.searchByCity;
    beforeAll(() => {
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl);
    });

    afterAll(()=> mainHelper.clearAllData());

    it(`should return at least ${searchCityData.minQuantity} items`, () => {
        pages.homePage.searchForm.search(searchCityData.searchData);
        pages.searchResultsPage.hotelsList.count().then(count => {
            expect(count >= searchCityData.minQuantity)
                .toBeTruthy(`Result set contains ${count} items satisfied search data`);
        });
    });

    it(`should contain '${searchCityData.searchData.city}' in location of each hotel item`, () => {
        pages.searchResultsPage.hotelsList.each((hotelItem, index) => {
            expect(pages.searchResultsPage.getLocationOfItem(hotelItem))
                .toContain(searchCityData.searchData.city,
                    `Hotel item #${index} does not contain '${searchCityData.searchData.city}'`);
        });
    });
});