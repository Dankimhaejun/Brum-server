const db = require('../../database/models');

const readAllUserLikeOrder = async userId => {
  return await db.userLikeOrder.findAll({
    where: { userId },
    order: [['orderId', 'ASC']],
    include: [
      {
        model: db.order
      }
    ]
  });
};

module.exports = {
  readAllUserLikeOrder
};
/* await db.order
    .findAll({
      where: { userId },
      order: [['orderId', 'ASC']],
      include: [
        {
          model: db.orderImage,
          attributes: ['orderImageId', 'orderImageURL']
        },
        {
          model: db.user,
          as: 'hostInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'university', 'image']
        },
        {
          model: db.applicant,
          attributes: ['applicantId']
        }
      ]
    })
    .catch(err => console.error(err)); */
