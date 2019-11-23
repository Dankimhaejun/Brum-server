const db = require('../../database/models');

const readUserInfo = async userId => {
  return await db.user
    .findOne({
      where: { userId: userId },
      attributes: ['userId', 'phone', 'name', 'sex', 'age', 'campus', 'major', 'introduction', 'image'],
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

const updateUserImage = async (userId, image) => {
  return db.user.update({ image: image }, { where: { userId: userId } }).catch(err => console.error(err));
};

module.exports = {
  readUserInfo,
  updateUserImage
};
