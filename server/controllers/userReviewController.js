import { vroomRes } from '../middlewares/customized';
import { sendPushNotificationByAxios } from '../middlewares/notification';
import { readUserPushToken } from '../models/userModel';
import { readHostAndDeliverIdByOrderIdNotMe } from '../models/orderModel/read';
import {
  createScoreAndReview,
  readAllMyReviews,
  readMyReviewforCheck,
  updateMyReview,
  deleteMyReview
} from '../models/reviewModel';

const getAllMyReviews = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const myAllReviews = await readAllMyReviews(userId);
    return res.json(
      vroomRes(
        true,
        true,
        '내가 받은 모든 리뷰 정보를 제공합니다. 주문과 연결하고 싶다면 링크를 통해 /order/:orderId 로 이동시켜주세요',
        {
          userId,
          myAllReviews
        }
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getEvaluatedReview = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const readReview = await readMyReviewforCheck(orderId, userId);
    return res.json(
      vroomRes(true, true, '내가 작성한 리뷰의 정보를 봅니다', {
        userId,
        readReview
      })
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
const postUserReview = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const { score, userReview } = req.body;
    console.log('score, userReview', score, userReview);
    const checkMyReview = await readMyReviewforCheck(orderId, userId);

    const getHostOrDeliverId = await readHostAndDeliverIdByOrderIdNotMe(orderId); // 객체로 id 반환 {hostId:16, deliverId: 19}
    const { hostId, deliverId } = getHostOrDeliverId;
    if (checkMyReview !== null) {
      return res.json(vroomRes(false, true, '이미 리뷰를 작성했습니다. 확인해주세요', checkMyReview));
    } // 이미 리뷰를 작성했을때
    if (userId === hostId) {
      await createScoreAndReview(orderId, userId, deliverId, score, userReview);
      const deliverPushToken = await readUserPushToken(deliverId);
      if (deliverPushToken) {
        await sendPushNotificationByAxios(deliverPushToken, '리뷰알림', '누군가 리뷰를 남겨주셨어요 확인해볼까요?');
      }
    } else {
      await createScoreAndReview(orderId, userId, hostId, score, userReview);
      const hostPushToken = await readUserPushToken(hostId);
      if (hostPushToken) {
        await sendPushNotificationByAxios(hostPushToken, '리뷰알림', '누군가 리뷰를 남겨주셨어요 확인해볼까요?');
      }
    }
    return res.json(vroomRes(true, true, '리뷰를 작성하였습니다 새로고침해보세요!'));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const putUserReview = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const { score, userReview } = req.body;
    await updateMyReview(orderId, userId, score, userReview);
    return res.json(
      vroomRes(true, true, '성공적으로 업데이트 되었습니다.', {
        orderId,
        userId,
        score,
        userReview
      })
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteUserReview = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    await deleteMyReview(orderId, userId);
    return res.json(vroomRes(true, true, '성공적으로 지워졌습니다 다시 한번 페이지를 확인해보세요'));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getAllMyReviews,
  getEvaluatedReview,
  postUserReview,
  putUserReview,
  deleteUserReview
};
