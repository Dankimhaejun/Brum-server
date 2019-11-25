'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        userId: 1,
        phone: '01094402182',
        password: '3584d803df03c185ce793a7971c28e4b2527e06801de9acb01bd504834992bd9',
        nickname: '김조은',
        sex: 'Female',
        age: '1991',
        campus: 'hanyang',
        major: 'vroom front',
        introduction: '안녕하세요',
        image: 'https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default',
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        userId: 2,
        phone: '01042926693',
        password: '116ad3f158dc9625097df51fc5b607a1d70993162a8f18d3bb3c9ef94d325002',
        nickname: '김해준',
        sex: 'Male',
        age: '1989',
        campus: 'snu',
        major: 'vroom backend',
        introduction: '안녕하세요',
        image: 'https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default',
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        userId: 3,
        phone: '01047070144',
        password: '116ad3f158dc9625097df51fc5b607a1d70993162a8f18d3bb3c9ef94d325002',
        nickname: '이영민',
        sex: 'Male',
        age: '1991',
        campus: 'hanyang',
        major: 'vroom front',
        introduction: '안녕하세요',
        image: 'https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default',
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        userId: 4,
        phone: '01012341234',
        password: '116ad3f158dc9625097df51fc5b607a1d70993162a8f18d3bb3c9ef94d325002',
        nickname: '정재숙',
        sex: 'Female',
        age: '1999',
        campus: 'hanyang',
        major: 'vroom front',
        introduction: '안녕하세요',
        image: 'https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default',
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        userId: 5,
        phone: '01012345678',
        password: '116ad3f158dc9625097df51fc5b607a1d70993162a8f18d3bb3c9ef94d325002',
        nickname: '서울대생',
        sex: 'Female',
        age: '1999',
        campus: 'snu',
        major: 'vroom front',
        introduction: '안녕하세요',
        image: 'https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default',
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
