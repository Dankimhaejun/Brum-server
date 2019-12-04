const db = require('../../database/models');

const createImageAndReturnURL = async (orderId, userId, chatImageURL) => {
  return await db.chatImage
    .create({ orderId, userId, chatImageURL })
    .then(result => result.dataValues.chatImageURL)
    .catch(err => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  createImageAndReturnURL
};
