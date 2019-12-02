const db = require('../../../database/models');

const readAllOrders = async () => {
  return await db.order
    .findAll({
      order: [['orderId', 'DESC']],
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
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readAllOrdersByCampus = async campus => {
  return await db.order
    .findAll({
      where: { campus },
      order: [['orderId', 'DESC']],
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
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readOneOrder = async orderId => {
  const views = await db.order.findOne({ where: { orderId } }).then(result => result.dataValues.views);
  await db.order.update({ views: views + 1 }, { where: { orderId }, silent: true });
  return await db.order
    .findOne({
      where: { orderId },
      include: [
        {
          model: db.orderImage,
          attributes: ['orderImageId', 'orderImageURL']
        },
        {
          model: db.user,
          as: 'hostInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'university', 'image'],
          include: [
            {
              model: db.review,
              as: 'getScore',
              attributes: ['score']
            }
          ]
        },
        {
          model: db.applicant,
          attributes: ['userId']
        },
        { model: db.userLikeOrder, attributes: ['userId'] }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readMyOrders = async userId => {
  return await db.order
    .findAll({
      where: { hostId: userId },
      order: [['orderId', 'DESC']],
      include: [
        {
          model: db.orderImage,
          attributes: ['orderImageId', 'orderImageURL']
        },
        {
          model: db.applicant,
          attributes: ['bidPrice', 'createdAt'],
          include: [
            {
              model: db.user,
              as: 'applicantInfo',
              attributes: ['userId', 'phone', 'nickname', 'sex', 'age', 'major', 'introduction', 'university', 'image'],
              include: [
                {
                  model: db.review,
                  as: 'getScore',
                  attributes: ['score']
                }
              ]
            }
          ]
        },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'university', 'image']
        }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readMyOneOrder = async (userId, orderId) => {
  return await db.order
    .findOne({
      where: { hostId: userId, orderId: orderId },
      include: [
        {
          model: db.orderImage,
          attributes: ['orderImageId', 'orderImageURL']
        },
        // {
        //   model: db.applicant
        // },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'university', 'image']
        }
      ]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readHostAndDeliverIdByOrderIdNotMe = async orderId => {
  return await db.order.findOne({ where: { orderId }, attributes: ['hostId', 'deliverId'] }).catch(err => {
    console.error(err);
    throw err;
  });
};

const readAllOrdersAsHost = async userId => {
  console.log('userId', userId);
  return await db.order
    .findAll({
      where: { hostId: userId },
      order: [['orderId', 'DESC']],
      include: [{ model: db.review }],
      paranoid: false
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readAllOrdersAsDeliver = async userId => {
  return await db.order
    .findAll({
      where: { deliverId: userId },
      order: [['orderId', 'DESC']],
      paranoid: false,
      include: [{ model: db.review }]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  readAllOrders,
  readAllOrdersByCampus,
  readOneOrder,
  readMyOrders,
  readMyOneOrder,
  readHostAndDeliverIdByOrderIdNotMe,
  readAllOrdersAsHost,
  readAllOrdersAsDeliver
};
