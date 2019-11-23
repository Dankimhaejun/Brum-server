const db = require('../../database/models');
import { hashPassword } from '../middlewares/hash';

const checkPhone = async phone => {
  return await db.user
    .findOne({
      where: { phone: phone }
    })
    .catch(err => console.error(err));
};

const createUser = async (phone, password, nickname, sex, agreementAd) => {
  const hashedPassword = hashPassword(password);
  return await db.user
    .create({
      phone,
      password: hashedPassword,
      nickname,
      sex,
      agreementAd
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
  return await db.user
    .update({ password: hashedPassword }, { where: { phone: phone } })
    .catch(err => console.error(err));
};
module.exports = {
  handleLogin,
  checkPhone,
  createUser,
  updateUserPassword
};
