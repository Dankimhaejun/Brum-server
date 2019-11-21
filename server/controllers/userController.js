import { vroomRes } from '../middlewares/vroomRes';
import { readUserInfo, updateUserImage } from '../models/userModel';
import { readMyOrders } from '../models/orderModel';
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

const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const getMyInfo = await readUserInfo(userId);
    const getOrders = await readMyOrders(userId);
    res.json(vroomRes(true, true, null, { myInfo: getMyInfo, orders: getOrders }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getMyInfo,
  postUserImage,
  getMyOrders
};
