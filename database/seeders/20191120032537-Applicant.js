'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('applicant', [
      {
        applicantId: 1,
        orderId: 2,
        userId: 1,
        bidPrice: '5000',
        applyComment: '누구보다 빠르게 남들보다 다르게',
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        applicantId: 2,
        orderId: 2,
        userId: 3,
        bidPrice: '3000',
        applyComment: '10분안에 만날 각',
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        applicantId: 3,
        orderId: 2,
        userId: 4,
        bidPrice: '10000',
        applyComment: '비싼만큼 확실하게!!!!!!!!!!!!',
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        applicantId: 4,
        orderId: 1,
        userId: 2,
        bidPrice: null,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        applicantId: 5,
        orderId: 3,
        userId: 2,
        bidPrice: '5000',
        applyComment: '누구보다 빠르게 남들보다 다르게',
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        applicantId: 6,
        orderId: 3,
        userId: 3,
        bidPrice: '3000',
        applyComment: '10분안에 만날 각',
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        applicantId: 7,
        orderId: 3,
        userId: 4,
        bidPrice: '10000',
        applyComment: '비싼만큼 확실하게!!!!!!!!!!!!',
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('applicant', null, {});
  }
};
