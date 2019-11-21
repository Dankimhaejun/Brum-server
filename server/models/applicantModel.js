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

module.exports = {
  readApplicants
};
