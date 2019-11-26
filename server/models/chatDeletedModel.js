const db = require('../../database/models');

const createChatDeleteStatusAsFalse = async (orderId, userId) => {
  await db.chatDeleted.create({
    orderId,
    userId
  });
};

module.exports = {
  createChatDeleteStatusAsFalse
};
