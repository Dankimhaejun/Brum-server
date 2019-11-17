const db = require('../database/models');
import { hashPassword } from '../middlewares/hash';

const checkPhone = async phone => {
  return await db.User.findOne({
    where: { phone: phone }
  }).catch(err => console.error(err));
};

const resisterUser = async (phone, password, name, sex, agreementAd) => {
  const hashedPassword = hashPassword(password);
  return await db.User.create({
    phone: phone,
    password: hashedPassword,
    name: name,
    sex: sex,
    agreementAd: agreementAd
  }).catch(err => console.error(err));
};

const handleLogin = async (phone, password) => {
  const hashedPassword = hashPassword(password);
  return await db.User.findOne({
    where: { phone: phone, password: hashedPassword }
  }).catch(err => console.error(err));
};

module.exports = {
  handleLogin,
  checkPhone,
  resisterUser
};
