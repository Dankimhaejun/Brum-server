const db = require('../../database/models');

const createOrder = async body => {
  const {
    campus,
    title,
    hostId,
    departures,
    depLat,
    depLng,
    arrivals,
    arrLat,
    arrLng,
    category,
    thumbnailURL,
    desiredArrivalTime,
    details,
    price,
    isPrice
  } = body;
  return await db.order
    .create({
      campus,
      title,
      hostId,
      departures,
      depLat,
      depLng,
      arrivals,
      arrLat,
      arrLng,
      category,
      thumbnailURL,
      desiredArrivalTime,
      details,
      price,
      isPrice
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readAllOrders = async () => {
  return await db.order
    .findAll({
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
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const readAllOrdersByCampus = async campus => {
  return await db.order
    .findAll({
      where: { campus },
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
              model: db.mannerScore,
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
      order: [['orderId', 'ASC']],
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
                  model: db.mannerScore,
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

const updateMyOrder = async body => {
  const { orderId, hostId, title, departures, arrivals, desiredArrivalTime, details, price, isPrice } = body;
  return await db.order
    .update(
      {
        title,
        departures,
        arrivals,
        desiredArrivalTime,
        details,
        price,
        isPrice
      },
      { where: { orderId, hostId } }
    )
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const updateOrderStatus = async (orderId, orderStatus) => {
  return db.order.update({ orderStatus }, { where: { orderId }, silent: true }).catch(err => {
    throw err;
  });
};

const updateMyOrderDeliver = async (orderId, deliverId) => {
  await db.applicant.update({ applyStatus: 'chosen' }, { where: { orderId, userId: deliverId } });
  return await db.order.update({ deliverId, orderStatus: 1 }, { where: { orderId }, silent: true }).catch(err => {
    console.error(err);
    throw err;
  });
};

const deleteMyOrder = async (userId, orderId) => {
  return await db.order.destroy({ where: { orderId, hostId: userId } }).catch(err => {
    console.error(err);
    throw err;
  });
};

const readAllOrdersAsHost = async userId => {
  console.log('userId', userId);
  return await db.order
    .findAll({
      where: { hostId: userId },
      order: [['orderId', 'ASC']],
      include: [{ model: db.mannerScore }]
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
      order: [['orderId', 'ASC']],
      include: [{ model: db.mannerScore }]
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  createOrder,
  readAllOrders,
  readAllOrdersByCampus,
  readOneOrder,
  readMyOrders,
  readMyOneOrder,
  updateMyOrder,
  updateOrderStatus,
  updateMyOrderDeliver,
  deleteMyOrder,
  readAllOrdersAsHost,
  readAllOrdersAsDeliver
};
