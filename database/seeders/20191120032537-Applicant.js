'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('applicant', [
      {
        applicantId: 1,
        orderId: 2,
        userId: 1,
        bidPrice: '5000',
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        applicantId: 2,
        orderId: 2,
        userId: 3,
        bidPrice: '3000',
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        applicantId: 3,
        orderId: 2,
        userId: 4,
        bidPrice: '10000',
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        applicantId: 4,
        orderId: 1,
        userId: 2,
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
