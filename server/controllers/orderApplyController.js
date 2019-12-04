import { vroomRes } from '../middlewares/customized';
import { sendPushNotificationByAxios } from '../middlewares/notification';
import { readHostPushTokenByOrderId } from '../models/userModel';
import { createOrderApply, readUserApplyOrNot, updateOrderApply, deleteMyOrderApply } from '../models/applicantModel';

const postOrderApply = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const { bidPrice, applyComment } = req.body;
    const checkApply = await readUserApplyOrNot(orderId, userId);
    const hostPushToken = await readHostPushTokenByOrderId(orderId);
    console.log('hostPushToken', hostPushToken);
    if (checkApply === null) {
      const postApply = await createOrderApply(orderId, userId, bidPrice, applyComment);
      if (hostPushToken) {
        await sendPushNotificationByAxios(hostPushToken, '지원자 발생', '내 주문에 지원자가 발생했습니다. 확인 바람');
      }
      return res.json(
        vroomRes(
          true,
          true,
          '1. 유저가 주문에 지원하기를 눌렀습니다. 아래는 지원한 유저의 정보입니다. 2. 유저의 지원이 완료되면 유저의 정보를 바탕으로 /order/:orderId 를 다시 랜더링해주시면 됩니다! 3. 유저가 지원목록에 추가가 되어있기 때문에 [내 지원 수정하기], [내 지원 삭제하기] 버튼을 활성화 시켜놓은 페이지가 됩니다.',
          { applicantInfo: postApply, hostPushToken }
        )
      );
    } else {
      return res.json(vroomRes(false, true, '이미 지원한 유저입니다. 다시 확인해주세요', null));
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const putOrderApply = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const { bidPrice, applyComment } = req.body;
    const updateApply = await updateOrderApply(orderId, userId, bidPrice, applyComment);
    console.log('updateApply', updateApply);
    return res.json(
      vroomRes(
        true,
        true,
        '업데이트가 완료되었습니다. 내가 지원한 내역으로 돌아가 금액과 커맨트가 수정되었는지 확인해야되는데..내가 지원한 현황은 볼 수 있는 방법을 찾아봅시다',
        updateApply
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteOrderApply = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const deleteApply = await deleteMyOrderApply(orderId, userId);
    console.log('deleteApply', deleteApply);
    return res.json(
      vroomRes(
        true,
        true,
        '1.내가 작성한 요청이 삭제되었습니다. 2. 다시 [GET] /order/:orderId로 화면을 전환해주세요. 3. 전환했을때 다시 [지원하기] 버튼이 활성화 된다면 성공!',
        deleteApply
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  postOrderApply,
  putOrderApply,
  deleteOrderApply
};
