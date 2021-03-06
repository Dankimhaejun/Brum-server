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

const updateUserInfo = async (userId, nickname, major, introduction) => {
  return await db.user.update({ nickname, major, introduction }, { where: { userId } }).catch(err => {
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

const updateUserEmailNotAuthed = async (userId, email, authCode) => {
  typeof authCode;
  return await db.user.update({ email, authCode }, { where: { userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const checkAuthCodeWithUserId = async (userId, authCode) => {
  return await db.user.findOne({ where: { userId, authCode } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const updateIsAuthedAndUniversity = async (userId, university) => {
  return await db.user.update({ isAuthed: true, university }, { where: { userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

module.exports = {
  readUserInfo,
  readUserPushToken,
  readHostPushTokenByOrderId,
  readDeliverPushTokenByOrderId,
  updateUserInfo,
  updateImage,
  updateCampus,
  updateUserEmailNotAuthed,
  updateIsAuthedAndUniversity,
  checkAuthCodeWithUserId
};
