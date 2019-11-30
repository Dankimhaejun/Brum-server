import { vroomRes } from '../middlewares/vroomRes';
import { sendPushNotificationByAxios } from '../middlewares/notifications';
import { readHostPushTokenByOrderId, readDeliverPushTokenByOrderId } from '../models/userModel';
import { updateOrderStatus } from '../models/orderModel';

const putOrderStatus = async (req, res, next) => {
  try {
    const { orderId, orderStatus } = req.params;
    const hostPushToken = await readHostPushTokenByOrderId(orderId); //주문자 푸시토큰 찾기
    const deliverPushToken = await readDeliverPushTokenByOrderId(orderId); // 배송자 푸시토큰 찾기
    const checkOrderStatus = await updateOrderStatus(orderId, orderStatus); // 주문 상태 변경하기
    if (orderStatus === '2') {
      // 2번일때, 배송시작버튼
      await sendPushNotificationByAxios(hostPushToken, '배송시작', '지금부타 출발합니다 기다려요!');
    } else if (orderStatus === '3') {
      // 3번일때, 배송완료버튼
      await sendPushNotificationByAxios(
        hostPushToken,
        '배송완료',
        '배송이 완료되었다고 전달했어요! 정말 완료되었나요? 완료되었으면 결제후 마무리 버튼 꼭 눌러주세요!'
      );
    } else if (orderStatus === '4') {
      // 4번일때, 거래완료 버튼
      await sendPushNotificationByAxios(
        deliverPushToken,
        '거래완료',
        '배송자님 고생하셨습니다! 모든 거래가 마무리 되었습니다!'
      );
    }
    res.json(vroomRes(true, true, `${orderStatus}번 버튼을 눌렀습니다`, checkOrderStatus));
  } catch (e) {
    next(e);
    throw e;
  }
};

module.exports = {
  putOrderStatus
};
