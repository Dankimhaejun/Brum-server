const db = require('../../database/models');

const readApplicants = async orderId => {
  return await db.applicant
    .findAll({
      where: { orderId: orderId },
      include: [
        {
          model: db.user,
          as: 'applicantInfo',
          attributes: [
            'userId',
            'phone',
            'nickname',
            'campus',
            'sex',
            'age',
            'major',
            'university',
            'introduction',
            'image'
          ],
          include: [
            {
              model: db.mannerScore,
              as: 'getScore',
              attributes: ['score']
              // attributes: [[db.sequelize.fn('sum', db.sequelize.col('score')), 'rateAvg']],
              // attributes: ['score', [db.sequelize.fn('sum', db.sequelize.col('score')), 'scoreAvg']],
              // group: ['receiverId'],
              // order: [[db.sequelize.fn('AVG', db.sequelize.col('score')), 'DESC']]
            }
          ]
        }
      ]
    })
    .catch(err => err);
};

const createOrderApply = async (orderId, userId, bidPrice, applyComment) => {
  return await db.applicant
    .create({
      orderId,
      userId,
      bidPrice,
      applyComment
    })
    .catch(err => err);
};

const readUserApplyOrNot = async (orderId, userId) => {
  return await db.applicant.findOne({ where: { orderId, userId } }).catch(err => err);
};

const updateOrderApply = async (orderId, userId, bidPrice, applyComment) => {
  console.log('bidPrice, applyComment', bidPrice, applyComment);
  return await db.applicant.update({ bidPrice, applyComment }, { where: { orderId, userId } }).catch(err => err);
};

const deleteMyOrderApply = async (orderId, userId) => {
  return await db.applicant.destroy({ where: { orderId, userId } }).catch(err => err);
};

const deleteApplicants = async orderId => {
  return await db.applicant.destroy({ where: orderId }).catch(err => err);
};

module.exports = {
  createOrderApply,
  readApplicants,
  readUserApplyOrNot,
  updateOrderApply,
  deleteMyOrderApply,
  deleteApplicants
};
