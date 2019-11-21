import { handleLogin, checkPhone, createUser, updateUserPassword } from '../models/registerModel';
import { vroomRes } from '../middlewares/vroomRes';
import { createToken } from '../middlewares/jwt';

const main = async (req, res, next) => {
  try {
    return res.json({ message: 'welcome' });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const register = async (req, res, next) => {
  try {
    const { phone, password, name, sex, agreementAd } = req.body;
    const isRegister = await createUser(phone, password, name, sex, agreementAd);
    if (isRegister.dataValues) {
      const userId = isRegister.dataValues.userId;
      const userPhone = isRegister.dataValues.phone;
      const token = await createToken(userId, userPhone);
      res.json(vroomRes(true, token, null, 'Success register and token issued'));
    }
  } catch (e) {
    console.error(e);
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
    console.error(e);
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
    const userId = isLogin.dataValues.userId;
    const userPhone = isLogin.dataValues.phone;
    const token = await createToken(userId, userPhone);
    res.json(vroomRes(true, token, null, 'Success login and token is issued'));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const isUser = await checkPhone(phone);
    if (!isUser) {
      return res.json(vroomRes(false, null, 'Not a registered user', null));
    }
    const resultChangePassword = await updateUserPassword(phone, password);
    // 업데이트 성공시 [1]이 뜨기 때문에 [1]로 성공여부 확인
    if (resultChangePassword[0] === 1) {
      res.json(vroomRes(true, true, null, 'Updated password, login again'));
    } else {
      res.json(vroomRes(false, true, 'Failed update password', null));
    }
    res.send();
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.json(vroomRes(true, false, null, 'Logged out, token is deleted'));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  main,
  login,
  register,
  checkDuplicatedPhone,
  changePassword,
  logout
};
