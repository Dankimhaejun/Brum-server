const db = require('../../../database/models');

const updateOrderStatus = async (orderId, orderStatus) => {
  return db.order.update({ orderStatus }, { where: { orderId }, silent: true }).catch(err => {
    throw err;
  });
};

const updateMyOrderDeliver = async (orderId, deliverId) => {
  await db.applicant.update({ applyStatus: 'chosen' }, { where: { orderId, userId: deliverId } });
  return await db.order.update({ deliverId, orderStatus: 1 }, { where: { orderId }, silent: true }).catch(err => {
    console.error(err);
    throw err;
  });
};

module.exports = {
  updateOrderStatus,
  updateMyOrderDeliver
};
