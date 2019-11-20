'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mannerRate', [
      {
        id: 1,
        raterId: 2,
        rateeId: 3,
        mannerRate: 10,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 2,
        raterId: 1,
        rateeId: 4,
        mannerRate: 5,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 3,
        raterId: 3,
        rateeId: 1,
        mannerRate: 9,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 4,
        raterId: 1,
        rateeId: 4,
        mannerRate: 5,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 5,
        raterId: 2,
        rateeId: 1,
        mannerRate: 9,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 6,
        raterId: 3,
        rateeId: 2,
        mannerRate: 10,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 7,
        raterId: 4,
        rateeId: 2,
        mannerRate: 3,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 8,
        raterId: 1,
        rateeId: 3,
        mannerRate: 4,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 9,
        raterId: 2,
        rateeId: 3,
        mannerRate: 10,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 10,
        raterId: 1,
        rateeId: 2,
        mannerRate: 10,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      }
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mannerRate', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
