import { vroomRes } from '../middlewares/vroomRes';
import { readHostAndDeliverIdByOrderIdNotMe } from '../models/orderModel/read';
import { createScoreAndReview, readMyReviewforCheck, updateMyReview } from '../models/reviewModel';

const postUserReview = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
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
  const userId = req.decoded.id;
  const orderId = req.params.orderId;
  const { score, userReview } = req.body;
  const updateReview = updateMyReview(userId, orderId, score, userReview);
};

module.exports = {
  postUserReview,
  putUserReview
};
