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
    return res.json(
      vroomRes(true, true, '새로운 주문이 추가되었습니다. 주문 정보는', {
        order: newOrder
      })
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const getAllOrders = await readAllOrders();
    res.json(
      vroomRes(true, true, '전체 주문 내역을 배열형태로 제공합니다.', {
        orders: getAllOrders
      })
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getIdOrder = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const getOrder = await readOneOrder(orderId);
    res.json(
      vroomRes(
        true,
        true,
        'orderId의 주문 정보를 제공합니다. userId는 필요시 사용하세요.(내 요청은 다르게 표현하고 싶을때, hostId를 비교하세요)',
        { userId: userId, order: getOrder }
      )
    );
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
