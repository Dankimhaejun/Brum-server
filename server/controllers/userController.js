import { vroomRes } from '../middlewares/vroomRes';
import { sendMailToClient } from '../middlewares/nodemailer';
import {
  readUserInfo,
  updateImage,
  updateCampus,
  updateUserEmailNotAuthed,
  checkAuthCodeWithUserId,
  updateIsAuthedWithUserId
} from '../models/userModel';

const getMyInfo = async (req, res) => {
  try {
    const userId = req.decoded.id;
    console.log('userId', userId);
    const userInfo = await readUserInfo(userId);
    return res.json(vroomRes(true, true, '유저의 개인정보, 평점을 제공합니다.', userInfo));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateUserImage = async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.headers', req.headers);
    console.log('req.file', req.file);
    const userId = req.decoded.id;
    const image = req.file.location;

    const inputUserImage = await updateImage(userId, image);
    // 이미지가 삽입되면 [1] , 이미지 삽입이 실패하면 [0]이 뜨기 대문에 [1]로 비교
    if (inputUserImage[0] === 1) {
      return res.json(
        vroomRes(true, true, '업로드가 성공했습니다.', {
          imageUrl: req.file.location
        })
      );
    } else {
      return res.json(vroomRes(false, true, '업로드가 실패했습니다.', null));
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateUserCampus = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { campus, major } = req.body;
    const inputUserCampus = await updateCampus(userId, campus, major);
    if (inputUserCampus[0] !== 0) {
      return res.json(
        vroomRes(true, true, '캠퍼스와 전공이 업데이트 되었습니다', {
          campus,
          major
        })
      );
    } else {
      return res.json(
        vroomRes(false, true, '업데이트가 실패하였습니다, 기존 데이터와 동일한지 확인하세요', { campus, major })
      );
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const checkAuthAndPutEmail = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { email } = req.body;
    const authCodeSixNumber = Math.floor(Math.random() * 1000000);
    await updateUserEmailNotAuthed(userId, email, authCodeSixNumber);
    await sendMailToClient(email, authCodeSixNumber);
    return res.json(
      vroomRes(
        true,
        true,
        '메일인증을 요청한 유저에게 메일을 전송했습니다. 유저는 6자리 숫자로된 인증코드를 받을 것입니다',
        sendMailToClient
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const checkAuthCode = async (req, res) => {
  const userId = req.decoded.id;
  const { authCode } = req.body;
  const checkCorrectAuthCode = await checkAuthCodeWithUserId(userId, authCode);
  if (checkCorrectAuthCode === null) {
    return res.json(vroomRes(false, true, '잘못된 인증코드입니다. 다시 확인하세요'));
  }
  await updateIsAuthedWithUserId(userId);
  return res.json(vroomRes(true, true, '보내주신 이메일로 인증이 완료되었습니다. 이 유저는 인증되었습니다'));
};

module.exports = {
  getMyInfo,
  updateUserImage,
  updateUserCampus,
  checkAuthAndPutEmail,
  checkAuthCode
};
