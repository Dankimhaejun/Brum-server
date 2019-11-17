import {
  handleLogin,
  checkPhone,
  resisterUser
} from '../models/resister_model';
import { vroomRes } from '../middlewares/vroomRes';

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
    const isResister = await resisterUser(
      phone,
      password,
      name,
      sex,
      agreementAd
    );
    if (!isResister) {
      res.json(vroomRes(false, false, 'Failed resister', null));
      return;
    }
    res.json(vroomRes(true, true, null, 'Success resister'));
    res.send();
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
    res.json(vroomRes(true, true, null, 'Success login'));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  main,
  login,
  resister,
  checkDuplicatedPhone
};
