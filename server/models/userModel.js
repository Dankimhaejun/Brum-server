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
          model: db.mannerScore,
          as: 'getScore',
          attributes: [
            [db.sequelize.fn('count', '*'), 'count'],
            [db.sequelize.fn('AVG', db.sequelize.col('score')), 'scoreAvg']
          ]
        }
      ]
    })
    .catch(err => console.error(err));
};

const updateImage = async (userId, image) => {
  return await db.user.update({ image }, { where: { userId } }).catch(err => console.error(err));
};

const updateCampus = async (userId, campus, major) => {
  return await db.user.update({ campus, major }, { where: { userId } }).catch(err => console.error(err));
};
module.exports = {
  readUserInfo,
  updateImage,
  updateCampus
};
