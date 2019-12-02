const db = require('../../database/models');

const createChatDeleteStatusAsFalse = async (orderId, userId) => {
  await db.chatDeleted
    .create({
      orderId,
      userId
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  createChatDeleteStatusAsFalse
};
