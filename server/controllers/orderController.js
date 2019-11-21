import { vroomRes } from '../middlewares/vroomRes';
import { createOrder, readAllOrders, readOneOrder } from '../models/orderModel';
import { createOrderImages } from '../models/orderImageModel';

const postOrder = async (req, res, next) => {
  try {
    const hostId = req.decoded.id;
    const body = req.body;
    const filesArray = req.files;
    body.hostId = hostId;
    const newOrder = await createOrder(body);
    const orderId = newOrder.dataValues.orderId;
    if (filesArray.length) {
      await createOrderImages(filesArray, orderId);
    }
    return res.json(vroomRes(true, true, null, 'Created new order'));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const getAllOrders = await readAllOrders();
    const userId = req.decoded.id;
    res.json(vroomRes(true, true, null, { userId: userId, orders: getAllOrders }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getIdOrder = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.id;
    const getOrder = await readOneOrder(orderId);
    res.json(vroomRes(true, true, null, { userId: userId, order: getOrder }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  postOrder,
  getOrders,
  getIdOrder
};
