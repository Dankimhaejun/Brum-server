const db = require('../../../database/models');

const deleteMyOrder = async (userId, orderId) => {
  return await db.order.destroy({ where: { orderId, hostId: userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

module.exports = {
  deleteMyOrder
};
