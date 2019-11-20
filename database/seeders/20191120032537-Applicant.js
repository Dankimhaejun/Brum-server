'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('applicant', [
      {
        id: 1,
        requestId: 2,
        applicantId: 2,
        bidPrice: '5000',
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 2,
        requestId: 2,
        applicantId: 3,
        bidPrice: '3000',
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 3,
        requestId: 2,
        applicantId: 4,
        bidPrice: '10000',
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 4,
        requestId: 1,
        applicantId: 2,
        bidPrice: null,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('applicant', null, {});
  }
};
