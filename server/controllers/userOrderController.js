import { vroomRes } from '../middlewares/vroomRes';
import { sendPushNotificationByAxios } from '../middlewares/notifications';
import { readUserInfo, readUserPushToken } from '../models/userModel';
import { readMyOrders, readMyOneOrder, updateMyOrderDeliver, updateMyOrder, deleteMyOrder } from '../models/orderModel';
import { deleteOrderImages } from '../models/orderImageModel';
import { readApplicants, deleteApplicants } from '../models/applicantModel';
import { createChatAsAdmin } from '../models/chatModel';

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
    const getMyInfo = await readUserInfo(userId);
    const getMyOneOrder = await readMyOneOrder(userId, orderId);
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

const putMyOneOrder = async (req, res, next) => {
  try {
    const hostId = req.decoded.id;
    const body = req.body;
    const orderId = req.params.orderId;
    body.hostId = hostId;
    body.orderId = orderId;
    const updatedOrder = await updateMyOrder(body);
    res.json(vroomRes(true, true, '주문이 업데이트 되었습니다. 업데이트 내용은 아래와 같습니다', { body }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteMyOneOrder = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    // const deleteAllApplicants = await deleteApplicants(orderId);
    // const deleteAllOrderImages = await deleteOrderImages(orderId);
    const deleteOrder = await deleteMyOrder(userId, orderId);
    console.log('deleteOrder', deleteOrder);
    res.json(vroomRes(true, true, '내 주문이 삭제되었습니다', deleteOrder));
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
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    let deliverId = req.body.deliverId;
    deliverId = String(deliverId);
    const putApplicant = await updateMyOrderDeliver(orderId, deliverId); // 배달자 지정해줌
    const createChat = await createChatAsAdmin(orderId); // 채팅방 생성해주는 모델
    const deliverInfo = await readUserInfo(deliverId);
    const userPushToken = await readUserPushToken(deliverId);
    await sendPushNotificationByAxios(userPushToken, '지원하신 주문에 배달자로 선정되었습니다. 채팅 확인해주세요.');
    return res.json(
      vroomRes(
        true,
        true,
        '내가 선택한 배달자를 주문내역에 업데이트 하고, 배달상태를 0에서 1로 변경합니다. 그리고 배달자의 정보를 드립니다.',
        deliverInfo
      )
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getMyOrders,
  getMyOneOrder,
  putMyOneOrder,
  deleteMyOneOrder,
  getMyOrderApplicant,
  putMyOrderApplicant
};
