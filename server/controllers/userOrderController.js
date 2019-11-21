import { vroomRes } from '../middlewares/vroomRes';
import { readUserInfo } from '../models/userModel';
import { readMyOrders, readMyOneOrder, updateMyOrderDeliver } from '../models/orderModel';
import { readApplicants } from '../models/applicantModel';

const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const getMyInfo = await readUserInfo(userId);
    const getOrders = await readMyOrders(userId);
    res.json(
      vroomRes(true, true, 'myInfo는 유저정보, orders는 내 전체 주문 정보를 배열로 제공합니다.', {
        myInfo: getMyInfo,
        orders: getOrders
      })
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getMyOneOrder = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const getMyOneOrder = await readMyOneOrder(userId, orderId);
    const getMyInfo = await readUserInfo(userId);
    res.json(
      vroomRes(true, true, 'myInfo는 유저의 정보, order는 주문 정보를 제공합니다.', {
        myInfo: getMyInfo,
        order: getMyOneOrder
      })
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getMyOrderApplicant = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const getMyApplicant = await readApplicants(orderId);
    res.json(
      vroomRes(true, true, '지원자들의 정보를 제공합니다, 지원자의 평점은 배열로 나와있으니 계산해주세요.', {
        applicants: getMyApplicant
      })
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const putMyOrderApplicant = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const deliverId = Number(req.body.deliverId);
    const putApplicant = await updateMyOrderDeliver(orderId, deliverId);
    console.log('putApplicant', putApplicant);
    const deliverInfo = await readUserInfo(deliverId);
    res.json(vroomRes(true, true, '배달자의 정보를 드립니다.', deliverInfo));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getMyOrders,
  getMyOneOrder,
  getMyOrderApplicant,
  putMyOrderApplicant
};
