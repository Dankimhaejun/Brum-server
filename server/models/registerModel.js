const db = require('../../database/models');
import { hashPassword } from '../middlewares/hash';

const checkPhone = async phone => {
  return await db.user
    .findOne({
      where: { phone: phone }
    })
    .catch(err => console.error(err));
};

const createUser = async (phone, password, nickname, sex, agreementAd, campus, age, pushToken) => {
  const hashedPassword = hashPassword(password);
  console.log('pushToken', pushToken);
  return await db.user
    .create({
      phone,
      password: hashedPassword,
      nickname,
      sex,
      agreementAd,
      pushToken,
      campus,
      age,
      image: 'https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default'
    })
    .catch(err => console.error(err));
};

const handleLogin = async (phone, password) => {
  const hashedPassword = await hashPassword(password);
  return await db.user
    .findOne({
      where: { phone: phone, password: hashedPassword }
    })
    .catch(err => console.error(err));
};

const updateUserPassword = async (phone, password) => {
  const hashedPassword = await hashPassword(password);
  return await db.user.update({ password: hashedPassword }, { where: { phone } }).catch(err => console.error(err));
};

const updatePushTokenByLogin = async (userId, pushToken) => {
  return await db.user.update({ pushToken }, { where: { userId } });
};

module.exports = {
  handleLogin,
  checkPhone,
  createUser,
  updateUserPassword,
  updatePushTokenByLogin
};
