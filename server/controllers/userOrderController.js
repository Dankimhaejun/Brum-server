import { vroomRes } from '../middlewares/vroomRes';
import { sendPushNotificationByAxios } from '../middlewares/notifications';
import { readUserInfo, readUserPushToken } from '../models/userModel';
import { readMyOrders, readMyOneOrder, readAllOrdersAsHost, readAllOrdersAsDeliver } from '../models/orderModel/read';
import { updateMyOrderDeliver, updateMyOrder } from '../models/orderModel/update';
import { deleteMyOrder } from '../models/orderModel/delete';
import { readApplicants } from '../models/applicantModel';
import { createChatAsAdmin } from '../models/chatModel';

const getMyOrders = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const getMyInfo = await readUserInfo(userId);
    const getOrders = await readMyOrders(userId);
    return res.json(
      vroomRes(true, true, 'myInfo는 유저정보, orders는 내 전체 주문 정보를 배열로 제공합니다.', {
        myInfo: getMyInfo,
        orders: getOrders
      })
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getMyOneOrder = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const getMyInfo = await readUserInfo(userId);
    const getMyOneOrder = await readMyOneOrder(userId, orderId);
    return res.json(
      vroomRes(true, true, 'myInfo는 유저의 정보, order는 주문 정보를 제공합니다.', {
        myInfo: getMyInfo,
        order: getMyOneOrder
      })
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const putMyOneOrder = async (req, res) => {
  try {
    const hostId = req.decoded.id;
    const body = req.body;
    const orderId = Number(req.params.orderId);
    body.hostId = hostId;
    body.orderId = orderId;
    await updateMyOrder(body);
    return res.json(vroomRes(true, true, '주문이 업데이트 되었습니다. 업데이트 내용은 아래와 같습니다', { body }));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteMyOneOrder = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const deleteOrder = await deleteMyOrder(userId, orderId);
    console.log('deleteOrder', deleteOrder);
    return res.json(vroomRes(true, true, '내 주문이 삭제되었습니다', deleteOrder));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getMyOrderApplicant = async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const getMyApplicant = await readApplicants(orderId);
    return res.json(
      vroomRes(true, true, '지원자들의 정보를 제공합니다, 지원자의 평점은 배열로 나와있으니 계산해주세요.', {
        applicants: getMyApplicant
      })
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const putMyOrderApplicant = async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    let deliverId = req.body.deliverId;
    deliverId = String(deliverId);
    await updateMyOrderDeliver(orderId, deliverId); // 배달자 지정해줌
    await createChatAsAdmin(orderId); // 채팅방 생성해주는 모델 (어드민으로 만들어줌)
    const deliverInfo = await readUserInfo(deliverId); // 배달자 정보 제공 (없어도 무관함)
    const userPushToken = await readUserPushToken(deliverId);
    await sendPushNotificationByAxios(userPushToken, '(경)당첨(축)', '배달하러 갑시다 채팅방을 여세요');
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
    throw e;
  }
};

const getMyOrdersAsHost = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderInfoAsHost = await readAllOrdersAsHost(userId);
    return res.json(vroomRes(true, true, '내가 host인 주문 내역을 보내드립니다.', orderInfoAsHost));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getMyOrdersAsDeliver = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderInfoAsDeliver = await readAllOrdersAsDeliver(userId);
    return res.json(vroomRes(true, true, '내가 deliver인 주문 내역을 보내드립니다', orderInfoAsDeliver));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getMyOrders,
  getMyOneOrder,
  putMyOneOrder,
  deleteMyOneOrder,
  getMyOrderApplicant,
  putMyOrderApplicant,
  getMyOrdersAsHost,
  getMyOrdersAsDeliver
};
