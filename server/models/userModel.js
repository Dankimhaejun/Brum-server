const db = require('../../database/models');

const getUserInfo = async id => {
  return await db.user
    .findOne({
      where: { id: id }
    })
    .catch(err => console.error(err));
};

const updateUserImage = async (id, image) => {
  return db.user.update({ image: image }, { where: { id: id } }).catch(err => console.error(err));
};

module.exports = {
  getUserInfo,
  updateUserImage
};
