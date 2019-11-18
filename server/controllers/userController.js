import { vroomRes } from '../middlewares/vroomRes';
import { getUserInfo, updateUserImage } from '../models/userModel';

const getMyInfo = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const userInfo = await getUserInfo(id);
    const { phone, name, sex, age, university, major, introduction, photo } = userInfo.dataValues;
    res.json(
      vroomRes(true, true, null, {
        phone,
        name,
        sex,
        age,
        university,
        major,
        introduction,
        photo
      })
    );
  } catch (e) {
    next(e);
  }
};

const postUserImage = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const image = req.file.location;
    const inputUserImage = await updateUserImage(id, image);
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
