'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        id: 1,
        phone: '01094402182',
        password: '3584d803df03c185ce793a7971c28e4b2527e06801de9acb01bd504834992bd9',
        name: '김조은',
        sex: 'Female',
        age: '1991',
        university: '한양대학교',
        major: 'vroom front',
        introduction: '안녕하세요',
        image: null,
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 2,
        phone: '01042926693',
        password: '116ad3f158dc9625097df51fc5b607a1d70993162a8f18d3bb3c9ef94d325002',
        name: '김해준',
        sex: 'Male',
        age: '1989',
        university: '한양대학교',
        major: 'vroom backend',
        introduction: '안녕하세요',
        image: null,
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 3,
        phone: '01047070144',
        password: '116ad3f158dc9625097df51fc5b607a1d70993162a8f18d3bb3c9ef94d325002',
        name: '이영민',
        sex: 'Male',
        age: '1991',
        university: null,
        major: 'vroom front',
        introduction: '안녕하세요',
        image: null,
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
      },
      {
        id: 4,
        phone: '01012341234',
        password: '116ad3f158dc9625097df51fc5b607a1d70993162a8f18d3bb3c9ef94d325002',
        name: '정재숙',
        sex: 'Female',
        age: '1999',
        university: '한양대학교',
        major: 'vroom front',
        introduction: '안녕하세요',
        image: null,
        agreementAd: false,
        isAdmin: true,
        createdAt: '2019-12-07 00:00:00',
        updatedAt: '2019-12-07 00:00:00'
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
