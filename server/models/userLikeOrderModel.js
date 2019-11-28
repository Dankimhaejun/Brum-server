const db = require('../../database/models');

const readAllUserLikeOrder = async userId => {
  return await db.userLikeOrder.findAll({
    where: { userId },
    order: [['orderId', 'ASC']],
    include: [
      {
        model: db.order
      }
    ]
  });
};

const createUserLikeOrder = async (userId, orderId) => {
  console.log('userId, orderId', userId, orderId);
  return await db.userLikeOrder
    .create({
      userId,
      orderId
    })
    .catch(err => console.log(err));
};

const deleteUserLikeOneOrder = async (userId, orderId) => {
  return await db.userLikeOrder.destroy({ where: { userId, orderId } }).catch(err => console.log(err));
};

module.exports = {
  readAllUserLikeOrder,
  createUserLikeOrder,
  deleteUserLikeOneOrder
};
/* await db.order
    .findAll({
      where: { userId },
      order: [['orderId', 'ASC']],
      include: [
        {
          model: db.orderImage,
          attributes: ['orderImageId', 'orderImageURL']
        },
        {
          model: db.user,
          as: 'hostInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'university', 'image']
        },
        {
          model: db.applicant,
          attributes: ['applicantId']
        }
      ]
    })
    .catch(err => console.error(err)); */
