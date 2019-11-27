'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('chat', [
      {
        chatId: 1,
        orderId: 1,
        userId: 2,
        chatDetail: '안녕하세요',
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 2,
        orderId: 1,
        userId: 3,
        chatDetail: '안녕하세요',
        createdAt: '2019-11-23 00:01:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 3,
        orderId: 1,
        userId: 2,
        chatDetail: '지금 바로 가능한가요?',
        createdAt: '2019-11-23 00:02:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 4,
        orderId: 1,
        userId: 3,
        chatDetail: '물론이죠ㅎㅎ',
        createdAt: '2019-11-23 00:03:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 5,
        orderId: 2,
        userId: 3,
        chatDetail: '영민님',
        createdAt: '2019-11-23 00:04:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 6,
        orderId: 2,
        userId: 4,
        chatDetail: '네 해준님',
        createdAt: '2019-11-23 00:05:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 7,
        orderId: 2,
        userId: 4,
        chatDetail: '하이',
        createdAt: '2019-11-23 00:06:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 8,
        orderId: 1,
        userId: 5,
        chatDetail: '나오지마라',
        createdAt: '2019-11-23 00:07:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 9,
        orderId: 5,
        userId: 4,
        chatDetail: '안나오겠지',
        createdAt: '2019-11-23 00:08:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 10,
        orderId: 2,
        userId: 5,
        chatDetail: '희안하게 이건 나올수도',
        createdAt: '2019-11-23 00:09:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        chatId: 11,
        orderId: 2,
        userId: 5,
        chatDetail: '안나와야대',
        createdAt: '2019-11-23 00:10:00',
        updatedAt: '2019-11-23 00:00:00'
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
    return queryInterface.bulkDelete('chat', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
