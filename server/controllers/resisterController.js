import { handleLogin, checkPhone, createUser } from '../models/resisterModel';
import { vroomRes } from '../middlewares/vroomRes';
import { createToken } from '../middlewares/jwt';

const main = async (req, res, next) => {
  try {
    return res.json({ message: 'welcome' });
  } catch (e) {
    next(e);
  }
};

const resister = async (req, res, next) => {
  try {
    const { phone, password, name, sex, agreementAd } = req.body;
    const isResister = await createUser(phone, password, name, sex, agreementAd);
    if (isResister.dataValues) {
      const userId = isResister.dataValues.id;
      const userPhone = isResister.dataValues.phone;
      const token = await createToken(userId, userPhone);
      res.json(vroomRes(true, token, null, 'Success resister and token issued'));
    }
  } catch (e) {
    next(e);
  }
};

const checkDuplicatedPhone = async (req, res, next) => {
  try {
    const phone = req.body.phone;
    const isDuplicate = await checkPhone(phone);
    if (!isDuplicate) {
      res.json(vroomRes(true, null, null, 'Available phone'));
      return;
    }
    res.json(vroomRes(false, null, 'Duplicated phone', null));
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const isLogin = await handleLogin(phone, password);
    if (!isLogin) {
      res.json(vroomRes(false, false, 'Incorrect information', null));
      return;
    }
    const userId = isLogin.dataValues.id;
    const userPhone = isLogin.dataValues.phone;
    const token = await createToken(userId, userPhone);
    res.json(vroomRes(true, token, null, 'Success login and token is issued'));
  } catch (e) {
    next(e);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.json(vroomRes(true, false, null, 'Logged out, token is deleted'));
  } catch (e) {
    next(e);
  }
};
module.exports = {
  main,
  login,
  resister,
  checkDuplicatedPhone,
  logout
};
