import { vroomRes } from '../middlewares/vroomRes';
import { readAllUserLikeOrder, createUserLikeOrder, deleteUserLikeOneOrder } from '../models/userLikeOrderModel';

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

const postUserLikeOrder = async (req, res, next) => {
  const userId = req.decoded.id;
  const orderId = Number(req.params.orderId);
  const createUserLike = await createUserLikeOrder(userId, orderId);
  res.json(vroomRes(true, true, '유저가 관심을 보였습니다 내가 관심 보인 주문의 성공데이터입니다.', createUserLike));
};

const deleteUserLikeOrder = async (req, res, next) => {
  const userId = req.decoded.id;
  const orderId = Number(req.params.orderId);
  const deleteUserLike = await deleteUserLikeOneOrder(userId, orderId);
  res.json(vroomRes(true, true, '유저의 관심 주문 목록에서 제거합니다. 제거 된 데이터입니다.', deleteUserLike));
};
module.exports = {
  getAllOrdersUserLike,
  postUserLikeOrder,
  deleteUserLikeOrder
};
