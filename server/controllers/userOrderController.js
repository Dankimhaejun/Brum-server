import { vroomRes } from '../middlewares/vroomRes';
import { readUserInfo } from '../models/userModel';
import { readMyOrders, readMyOneOrder } from '../models/orderModel';
import { readApplicants } from '../models/applicantModel';

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

const getMyOneOrder = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const getMyOneOrder = await readMyOneOrder(userId, orderId);
    const getMyInfo = await readUserInfo(userId);
    res.json(vroomRes(true, true, null, { myInfo: getMyInfo, order: getMyOneOrder }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getMyOrderApplicant = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const getMyApplicant = await readApplicants(orderId);
    res.json(vroomRes(true, true, null, { applicants: getMyApplicant }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getMyOrders,
  getMyOneOrder,
  getMyOrderApplicant
};
