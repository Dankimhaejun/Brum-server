const db = require('../../database/models');

const readUserInfo = async userId => {
  return await db.user
    .findOne({
      where: { userId: userId },
      attributes: ['userId', 'phone', 'name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
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
