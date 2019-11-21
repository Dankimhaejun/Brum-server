'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mannerScore', [
      {
        mannerScoreId: 1,
        evaluatorId: 2,
        receiverId: 1,
        score: 5,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 2,
        evaluatorId: 3,
        receiverId: 1,
        score: 4,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 3,
        evaluatorId: 4,
        receiverId: 1,
        score: 2,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 4,
        evaluatorId: 1,
        receiverId: 2,
        score: 5,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 5,
        evaluatorId: 3,
        receiverId: 2,
        score: 4,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 6,
        evaluatorId: 4,
        receiverId: 2,
        score: 1,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 7,
        evaluatorId: 1,
        receiverId: 3,
        score: 2,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 8,
        evaluatorId: 2,
        receiverId: 3,
        score: 5,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 9,
        evaluatorId: 4,
        receiverId: 3,
        score: 4,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 10,
        evaluatorId: 1,
        receiverId: 4,
        score: 3,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 11,
        evaluatorId: 2,
        receiverId: 4,
        score: 3,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        mannerScoreId: 12,
        evaluatorId: 3,
        receiverId: 4,
        score: 4,
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
    return queryInterface.bulkDelete('score', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
