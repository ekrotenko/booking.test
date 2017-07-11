'use strict';
const moment = require('moment');

module.exports = {
    searchData: {
        city: 'New York City',
        startDate: moment().format('D/MMMM/YYYY'),
        endDate: moment().add(7, 'days').format('D/MMMM/YYYY')
    },
    minQuantity: 1
};