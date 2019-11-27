const db = require('../../database/models');

const createOrderImages = async (filesArray, orderId) => {
  for (let i = 0; i < filesArray.length; i++) {
    await db.orderImage
      .create({
        orderId: orderId,
        orderImageURL: filesArray[i].location
      })
      .catch(err => err);
  }
  return;
};

const deleteOrderImages = async orderId => {
  return await db.orderImage.destroy({ where: orderId }).catch(err => err);
};
module.exports = {
  createOrderImages,
  deleteOrderImages
};
