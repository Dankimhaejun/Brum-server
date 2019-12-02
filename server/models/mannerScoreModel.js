const db = require('../../database/models');
const Op = db.Sequelize.Op;

const readMyReviewforCheck = async (userId, orderId) => {
  return await db.mannerScore.findOne({ where: { orderId, evaluatorId: userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const readUserAllChatsByUserIdStatus1 = async userId => {
  console.log('userId', userId);
  return await db.order
    .findAll({
      order: [['orderId', 'DESC']],
      where: {
        // [Op.not]: { orderStatus: 0 },
        orderStatus: { [Op.between]: [1, 4] },
        [Op.or]: { hostId: userId, deliverId: userId }
      },
      include: [
        {
          model: db.user,
          as: 'hostInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        },
        { model: db.chat }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readOneChatDetailByOrderId = async orderId => {
  return await db.order
    .findOne({
      where: { orderId },
      include: [
        {
          model: db.user,
          as: 'hostInfo',
          attributes: ['userId', 'nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: ['userId', 'nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        },
        { model: db.chat }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  readMyReviewforCheck,
  readUserAllChatsByUserIdStatus1,
  readOneChatDetailByOrderId
};
