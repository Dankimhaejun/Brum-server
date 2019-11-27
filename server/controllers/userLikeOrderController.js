import { vroomRes } from '../middlewares/vroomRes';
import { readAllUserLikeOrder } from '../models/userLikeOrderModel';

const getAllOrdersUserLike = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    console.log('userId', userId);
    const readUserLikeOrder = await readAllUserLikeOrder(userId);
    res.json(vroomRes(true, true, '유저가 하트를 붙인 모든 리스트를 보여줍니다', readUserLikeOrder));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getAllOrdersUserLike
};
