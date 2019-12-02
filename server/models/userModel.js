const db = require('../../database/models');

const readUserInfo = async userId => {
  return await db.user
    .findOne({
      where: { userId: userId },
      attributes: [
        'userId',
        'phone',
        'nickname',
        'sex',
        'age',
        'campus',
        'major',
        'university',
        'introduction',
        'image'
      ],
      include: [
        {
          model: db.review,
          as: 'getScore',
          attributes: [
            [db.sequelize.fn('count', '*'), 'count'],
            [db.sequelize.fn('AVG', db.sequelize.col('score')), 'scoreAvg']
          ]
        }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readUserPushToken = async userId => {
  return await db.user
    .findOne({ where: { userId: userId } })
    .then(result => result.dataValues.pushToken)
    .catch(err => {
      throw err;
    });
};

const readHostPushTokenByOrderId = async orderId => {
  return await db.order
    .findOne({
      where: { orderId },
      include: [
        {
          model: db.user,
          as: 'hostInfo'
        }
      ]
    })
    .then(result => result.dataValues.hostInfo.pushToken)
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readDeliverPushTokenByOrderId = async orderId => {
  return await db.order
    .findOne({
      where: { orderId },
      include: [
        {
          model: db.user,
          as: 'deliverInfo'
        }
      ]
    })
    .then(result => result.dataValues.deliverInfo.pushToken)
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const updateImage = async (userId, image) => {
  return await db.user.update({ image }, { where: { userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const updateCampus = async (userId, campus, major) => {
  return await db.user.update({ campus, major }, { where: { userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

module.exports = {
  readUserInfo,
  readUserPushToken,
  readHostPushTokenByOrderId,
  readDeliverPushTokenByOrderId,
  updateImage,
  updateCampus
};
