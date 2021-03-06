'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order', [
      {
        orderId: 1,
        views: 0,
        hostId: 2,
        campus: 'hanyang',
        title: '한양대 공학관 -> 우리집으로 무거운 물건좀 옮겨주세요',
        departures: '우리집',
        arrivals: '한양대 신소재공학관',
        arrLat: '37.55449',
        arrLng: '127.045256',
        category: '기타',
        desiredArrivalTime: null,
        details: '집으로 보내주세요!!',
        price: null,
        isPrice: false,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-26 09:00:00',
        updatedAt: '2019-11-26 09:00:00'
      },
      {
        orderId: 2,
        views: 0,
        hostId: 4,
        campus: 'hanyang',
        title: '한양대 생활과학관 2층 화장실 휴지좀',
        departures: null,
        arrivals: '한양대학교 생활과학관',
        arrLat: '37.556719',
        arrLng: '127.046726',
        category: '기타',
        desiredArrivalTime: null,
        details: '바로 오세요 지금 바로!!!!!',
        price: null,
        isPrice: false,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-26 09:00:00',
        updatedAt: '2019-11-26 09:00:00'
      },
      {
        orderId: 3,
        views: 0,
        hostId: 2,
        campus: 'hanyang',
        title: '한양대 나나서점에서 책 사주실분',
        departures: '나나서점',
        arrivals: '한양대학교 서울캠퍼스 대학원',
        arrLat: '37.556668',
        arrLng: '127.044537',
        category: '기타',
        desiredArrivalTime: null,
        details: '필요한 책은 경영학개론 2019년 개정판입니다. 지금 바로 부탁드려요! 가격은 제시해주세요!!',
        price: null,
        isPrice: false,
        deliverId: 3,
        orderStatus: 1,
        actualArrivalTime: null,
        createdAt: '2019-11-26 09:20:00',
        updatedAt: '2019-11-26 09:20:00'
      },
      {
        orderId: 4,
        views: 0,
        hostId: 5,
        campus: 'hanyang',
        title: '독일 -> 한양대 경영대학원',
        departures: '독일',
        arrivals: '한양대학교 경영대학원',
        arrLat: '37.558148',
        arrLng: '127.048196',
        category: '기타',
        desiredArrivalTime: '2019-12-24 00:00:00',
        details: '독일로 보내주세요!!',
        price: '10000',
        isPrice: true,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-26 00:00:00',
        updatedAt: '2019-11-26 00:00:00'
      },
      {
        orderId: 5,
        views: 0,
        hostId: 6,
        campus: 'snu',
        title: '서울대 -> 한양대 제1법학관 옮겨주세요',
        departures: '서울대',
        arrivals: '한양대학교 제1법학관',
        arrLat: '37.556608',
        arrLng: '127.047842',
        category: '기타',
        desiredArrivalTime: '2019-12-24 00:00:00',
        details: '한양대공학관으로 보내주세요!!',
        price: '9000',
        isPrice: true,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-26 00:00:00',
        updatedAt: '2019-11-26 00:00:00'
      },
      {
        orderId: 6,
        views: 0,
        hostId: 2,
        campus: 'hanyang',
        title: '근처 스타벅스에서 따뜻한 아메리카노 그란데 사이즈 한잔 부탁드립니다',
        departures: '스타벅스',
        arrivals: '한양대학교 제2공학관',
        arrLat: '37.555681',
        arrLng: '127.046243',
        category: '기타',
        desiredArrivalTime: null,
        details: '커피 한잔 주세요!',
        price: 10000,
        isPrice: true,
        deliverId: 5,
        orderStatus: 1,
        actualArrivalTime: null,
        createdAt: '2019-11-26 09:20:00',
        updatedAt: '2019-11-26 09:20:00'
      },
      {
        orderId: 7,
        views: 0,
        hostId: 2,
        campus: 'hanyang',
        title: '한양대 보라돌이 서점에서 책 사주실분',
        departures: '보라돌이서점',
        arrivals: '한양대학교 제1학생생활관',
        arrLat: '37.558939',
        arrLng: '127.047026',
        desiredArrivalTime: null,
        details: '필요한 인형은 보라돌이 인형입니다. 지금 바로 부탁드려요! 가격은 제시해주세요!!',
        price: null,
        isPrice: false,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-26 09:20:00',
        updatedAt: '2019-11-26 09:20:00'
      },
      {
        orderId: 8,
        views: 0,
        hostId: 2,
        campus: 'hanyang',
        title: '한양대 뚜비를 찾습니다',
        departures: '한양대 정문',
        arrivals: '한양대학교 자연과학관',
        arrLat: '37.558624',
        arrLng: '127.044387',
        category: '기타',
        desiredArrivalTime: null,
        details: '뚜비뚜비',
        price: null,
        isPrice: false,
        deliverId: null,
        orderStatus: 0,
        actualArrivalTime: null,
        createdAt: '2019-11-26 09:20:00',
        updatedAt: '2019-11-26 09:20:00'
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
