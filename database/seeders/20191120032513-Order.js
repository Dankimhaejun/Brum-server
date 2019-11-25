'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order', [
      {
        orderId: 1,
        views: 0,
        hostId: 1,
        campus: 'hanyang',
        title: '한양대 공학관 -> 우리집으로 무거운 물건좀 옮겨주세요',
        departures: '한양대 공학관',
        arrivals: '우리집',
        category: '기타',
        desiredArrivalTime: null,
        details: '집으로 보내주세요!!',
        price: '10000',
        isPrice: true,
        deliverId: 2,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        orderId: 2,
        views: 0,
        hostId: 2,
        campus: 'hanyang',
        title: '한양대 인문학과 2층 화장실 휴지좀',
        departures: null,
        arrivals: '한양대 인문학과 2층 화장실',
        category: '기타',
        desiredArrivalTime: null,
        details: '바로 오세요 지금 바로!!!!!',
        price: null,
        isPrice: false,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        orderId: 3,
        views: 0,
        hostId: 1,
        campus: 'hanyang',
        title: '한양대 나나서점에서 책 사주실분',
        departures: '나나서점',
        arrivals: '한양대 교양학관 2층 205호',
        category: '기타',
        desiredArrivalTime: null,
        details: '필요한 책은 경영학개론 2019년 개정판입니다. 지금 바로 부탁드려요! 가격은 제시해주세요!!',
        price: null,
        isPrice: false,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-23 00:00:00',
        updatedAt: '2019-11-23 00:00:00'
      },
      {
        orderId: 4,
        views: 0,
        hostId: 4,
        campus: 'hanyang',
        title: '한양대 공학관 -> 독일로 옮겨주세요',
        departures: '한양대 공학관',
        arrivals: '독일',
        category: '기타',
        desiredArrivalTime: '2019-12-24 00:00:00',
        details: '독일로 보내주세요!!',
        price: '10000',
        isPrice: true,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-23 00:00:00',
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
    return queryInterface.bulkDelete('order', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
