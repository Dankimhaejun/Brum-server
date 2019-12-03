const db = require('../../database/models');
const Op = db.Sequelize.Op;

const readMyReviewforCheck = async (userId, orderId) => {
  return await db.review.findOne({ where: { orderId, evaluatorId: userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const createScoreAndReview = async (orderId, evaluatorId, receiverId, score, userReview) => {
  return await db.review
    .create({
      orderId,
      evaluatorId,
      receiverId,
      score,
      userReview
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const updateMyReview = async (orderId, evaluatorId, score, userReview) => {
  return await db.review.update({ score, userReview }, { where: { orderId, evaluatorId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const deleteMyReview = async (orderId, evaluatorId) => {
  return await db.review.destroy({ where: { orderId, evaluatorId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

module.exports = {
  createScoreAndReview,
  readMyReviewforCheck,
  updateMyReview,
  deleteMyReview
};
