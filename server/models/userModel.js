const db = require('../../database/models');

const readUserInfo = async id => {
  return await db.user
    .findOne({
      where: { id: id },
      attributes: ['id', 'phone', 'name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
    })
    .catch(err => console.error(err));
};

const updateUserImage = async (id, image) => {
  return db.user.update({ image: image }, { where: { id: id } }).catch(err => console.error(err));
};

module.exports = {
  readUserInfo,
  updateUserImage
};
