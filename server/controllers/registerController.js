import {
  handleLogin,
  checkPhone,
  createUser,
  updateUserPassword,
  updatePushTokenByLogin
} from '../models/registerModel';
import { vroomRes } from '../middlewares/customized';
import { createToken } from '../middlewares/jwt';

const main = async (req, res) => {
  try {
    return res.json({ message: 'welcome' });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const register = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { phone, password, nickname, sex, agreementAd, campus, age, pushToken } = req.body;
    console.log('pushToken', pushToken);
    const isRegister = await createUser(phone, password, nickname, sex, agreementAd, campus, age, pushToken);
    if (isRegister.dataValues) {
      const userId = isRegister.dataValues.userId;
      const campus = isRegister.dataValues.campus;
      const token = await createToken(userId, campus);
      return res.json(
        vroomRes(true, token, '등록이 완료되었으며, token에 토큰이 담겨있습니다. asyncStorage로 옮겨주세요', {
          /* firebaseRegister */
        })
      );
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const checkDuplicatedPhone = async (req, res) => {
  try {
    const phone = req.body.phone;
    const isDuplicate = await checkPhone(phone);
    if (!isDuplicate) {
      return res.json(vroomRes(true, null, '이용가능한 휴대폰 번호입니다.', phone));
    }
    return res.json(vroomRes(false, null, '중복된 휴대폰 번호입니다. 이용불가합니다.', phone));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const login = async (req, res) => {
  try {
    const { phone, password, pushToken } = req.body;
    console.log('pushToken', pushToken);
    const isLogin = await handleLogin(phone, password);
    if (!isLogin) {
      return res.json(vroomRes(false, false, '잘못된 정보를 입력하여 로그인 할 수 없습니다.', null));
    }
    const userId = isLogin.dataValues.userId;
    const campus = isLogin.dataValues.campus;
    const updatePushToken = await updatePushTokenByLogin(userId, pushToken);
    console.log('updatePushToken', updatePushToken);
    const token = await createToken(userId, campus);
    return res.json(
      vroomRes(
        true,
        token,
        '로그인이 되었습니다. token에 토큰이 발급되었으니 storage로 옮겨주세요' /* { firebaseLogin } */
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const changePassword = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const isUser = await checkPhone(phone);
    if (!isUser) {
      return res.json(vroomRes(false, false, '등록된 유저가 아닙니다. 다시 확인해주세요.', null));
    }
    const resultChangePassword = await updateUserPassword(phone, password);
    // 업데이트 성공시 [1]이 뜨기 때문에 [1]로 성공여부 확인
    if (resultChangePassword[0] === 1) {
      return res.json(vroomRes(true, false, '비밀번호가 변경되었습니다, 다시 로그인 해주세요.', null));
    }
    return res.json(vroomRes(false, false, '비밀번호 변경 실패했습니다, 다시 시도해주세요.', null));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    return res.json(vroomRes(true, false, null, 'Logged out, token is deleted'));
  } catch (e) {
    console.error(e);
    throw e;
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
