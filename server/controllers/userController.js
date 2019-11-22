import { vroomRes } from '../middlewares/vroomRes';
import { readUserInfo, updateUserImage } from '../models/userModel';

const getMyInfo = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    console.log('userId', userId);
    const userInfo = await readUserInfo(userId);
    res.json(vroomRes(true, true, '유저의 개인정보, 평점을 제공합니다.', userInfo));
  } catch (e) {
    next(e);
  }
};

const postUserImage = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    console.log('req.headers', req.headers);
    console.log('req.file', req.file);
    const userId = req.decoded.id;
    const image = req.file.location;

    const inputUserImage = await updateUserImage(userId, image);
    // 이미지가 삽입되면 [1] , 이미지 삽입이 실패하면 [0]이 뜨기 대문에 [1]로 비교
    if (inputUserImage[0] === 1) {
      res.json(vroomRes(true, true, '업로드가 성공했습니다.', null));
    } else {
      res.json(vroomRes(false, true, '업로드가 실패했습니다.', null));
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getMyInfo,
  postUserImage
};
