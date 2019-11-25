const db = require('../../database/models');

const createChatAsAdmin = async orderId => {
  db.chat
    .create({
      orderId,
      userId: 1,
      chatDetail: '채팅방이 생성되었습니다.'
    })
    .catch(err => console.error(err));
};

module.exports = {
  createChatAsAdmin
};
