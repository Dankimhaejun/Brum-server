const db = require('../../database/models');
const Op = db.Sequelize.Op;

const readMyReviewforCheck = async (userId, orderId) => {
  return await db.review.findOne({ where: { orderId, evaluatorId: userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const createScoreAndReview = async (orderId, evaluatorId, receiverId, score, userReview) => {
  return await db.review.create({
    orderId,
    evaluatorId,
    receiverId,
    score,
    userReview
  });
};
module.exports = {
  readMyReviewforCheck,
  createScoreAndReview
};
