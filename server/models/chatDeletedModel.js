const db = require('../../database/models');

const createChatDeleteStatusAsFalse = async (orderId, userId) => {
  await db.chatDeleted
    .create({
      orderId,
      userId
    })
    .catch(err => {
      throw err;
    });
};

module.exports = {
  createChatDeleteStatusAsFalse
};
