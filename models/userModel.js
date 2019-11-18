const db = require('../database/models');

const getUserInfo = async id => {
  return await db.User.findOne({
    where: { id: id }
  }).catch(err => console.error(err));
};

module.exports = {
  getUserInfo
};
