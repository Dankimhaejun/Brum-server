import { vroomRes } from '../middlewares/vroomRes';
import { readMyReviewforCheck } from '../models/mannerScoreModel';

const postUserReview = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const orderId = req.params.orderId;
    const { score, review } = req.body;
    console.log('score, review', score, review);
    const checkMyReview = await readMyReviewforCheck(userId, orderId);
    if (checkMyReview !== null) {
      res.json(vroomRes(false, true, '이미 리뷰를 작성했습니다. 확인해주세요', checkMyReview));
    }
    const getHostOrDeliverId = await readHostAndDeliverIdByOrderIdNotMe(orderId);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  postUserReview
};
