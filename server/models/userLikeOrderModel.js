const db = require('../../database/models');

const readAllUserLikeOrder = async userId => {
  return await db.userLikeOrder
    .findAll({
      where: { userId },
      paranoid: false,
      include: [
        {
          model: db.order,
          order: [['orderId', 'DESC']],
          paranoid: false
        }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const createUserLikeOrder = async (userId, orderId) => {
  console.log('userId, orderId', userId, orderId);
  return await db.userLikeOrder
    .create({
      userId,
      orderId
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const deleteUserLikeOneOrder = async (userId, orderId) => {
  return await db.userLikeOrder.destroy({ where: { userId, orderId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

module.exports = {
  readAllUserLikeOrder,
  createUserLikeOrder,
  deleteUserLikeOneOrder
};
/* await db.order
    .findAll({
      where: { userId },
      order: [['orderId', 'DESC']],
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
