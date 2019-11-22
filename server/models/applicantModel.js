const db = require('../../database/models');

const readApplicants = async orderId => {
  return db.applicant
    .findAll({
      where: { orderId: orderId },
      include: [
        {
          model: db.user,
          as: 'applicantInfo',
          attributes: ['userId', 'phone', 'name', 'sex', 'age', 'major', 'introduction', 'image'],
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
    .catch(err => console.error(err));
};

const createOrderApply = async (orderId, userId, bidPrice, applyComment) => {
  return await db.applicant
    .create({
      orderId,
      userId,
      bidPrice,
      applyComment
    })
    .catch(err => console.error(err));
};

const readUserApply = async (orderId, userId) => {
  return await db.applicant.findOne({ where: { orderId, userId } }).catch(err => console.error(err));
};

const updateOrderApply = async (orderId, userId, bidPrice, applyComment) => {
  return await db.applicant
    .update({ bidPrice, applyComment }, { where: { orderId, userId } })
    .catch(err => console.error(err));
};

const deleteMyOrderApply = async (orderId, userId) => {
  return await db.applicant.destroy({ where: { orderId, userId } }).catch(err => console.error(err));
};
module.exports = {
  createOrderApply,
  readApplicants,
  readUserApply,
  updateOrderApply,
  deleteMyOrderApply
};
