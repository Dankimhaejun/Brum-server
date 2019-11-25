const db = require('../../database/models');

const createChatDeleteStatusAsFalse = async (orderId, userId) => {
  db.chatDeleted.create({
    orderId,
    userId
  });
};

module.exports = {
  createChatDeleteStatusAsFalse
};
