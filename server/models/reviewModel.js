const db = require('../../database/models');
const Op = db.Sequelize.Op;

const readAllMyReviews = async receiverId => {
  return await db.review
    .findAll({
      where: { receiverId },
      include: [
        {
          model: db.user,
          as: 'evaluator',
          attributes: ['phone', 'nickname', 'sex', 'age', 'campus', 'major', 'university', 'introduction', 'image']
        }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readReviewEvaluated = async (orderId, evaluatorId) => {
  return await db.review.findOne({ where: orderId, evaluatorId }).catch(err => {
    console.error(err);
    throw err;
  });
};

const readMyReviewforCheck = async (orderId, evaluatorId) => {
  return await db.review
    .findOne({
      where: { orderId, evaluatorId },
      include: [
        {
          model: db.user,
          as: 'getScore',
          attributes: ['phone', 'nickname', 'sex', 'age', 'campus', 'major', 'university', 'introduction', 'image']
        }
      ]
    })
    .catch(err => {
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
  readAllMyReviews,
  readReviewEvaluated,
  readMyReviewforCheck,
  updateMyReview,
  deleteMyReview
};
