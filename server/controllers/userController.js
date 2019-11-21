import { vroomRes } from '../middlewares/vroomRes';
import { readUserInfo, updateUserImage } from '../models/userModel';

const getMyInfo = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    console.log('userId', userId);
    const userInfo = await readUserInfo(userId);
    res.json(vroomRes(true, true, null, userInfo));
  } catch (e) {
    next(e);
  }
};

const postUserImage = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    console.log('req.headers', req.headers);
    console.log('req.file', req.file);
    console.log('req.files', req.files);
    const userId = req.decoded.id;
    const image = req.file.location;

    const inputUserImage = await updateUserImage(userId, image);
    // 이미지가 삽입되면 [1] , 이미지 삽입이 실패하면 [0]이 뜨기 대문에 [1]로 비교
    if (inputUserImage[0] === 1) {
      res.json(vroomRes(true, true, null, 'Uploaded image'));
    } else {
      res.json(vroomRes(false, true, 'Failed upload', null));
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getMyInfo,
  postUserImage
};
