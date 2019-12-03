import { vroomRes } from '../middlewares/vroomRes';
import { readHostAndDeliverIdByOrderIdNotMe } from '../models/orderModel/read';
import { createScoreAndReview, readMyReviewforCheck, updateMyReview, deleteMyReview } from '../models/reviewModel';

const postUserReview = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = Number(req.params.orderId);
    const { score, userReview } = req.body;
    console.log('score, userReview', score, userReview);
    const checkMyReview = await readMyReviewforCheck(userId, orderId);
    if (checkMyReview !== null) {
      return res.json(vroomRes(false, true, '이미 리뷰를 작성했습니다. 확인해주세요', checkMyReview));
    }
    const getHostOrDeliverId = await readHostAndDeliverIdByOrderIdNotMe(orderId); // 객체로 id 반환 {hostId:16, deliverId: 19}
    const { hostId, deliverId } = getHostOrDeliverId;
    console.log('hostId, deliverId', hostId, deliverId);
    if (userId === hostId) {
      await createScoreAndReview(orderId, userId, deliverId, score, userReview);
    } else {
      await createScoreAndReview(orderId, userId, hostId, score, userReview);
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
  postUserReview,
  putUserReview,
  deleteUserReview
};
