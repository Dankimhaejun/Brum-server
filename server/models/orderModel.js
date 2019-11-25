const db = require('../../database/models');

const createOrder = async body => {
  const { campus, title, hostId, departures, arrivals, category, desiredArrivalTime, details, price, isPrice } = body;
  return db.order
    .create({
      campus,
      title,
      hostId,
      departures,
      arrivals,
      category,
      desiredArrivalTime,
      details,
      price,
      isPrice
    })
    .catch(err => console.error(err));
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
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        },
        {
          model: db.applicant,
          attributes: ['applicantId']
        }
      ]
    })
    .catch(err => console.error(err));
};

const readAllOrdersByCampus = async campus => {
  return await db.order
    .findAll(
      { where: { campus } },
      {
        order: [['orderId', 'ASC']],
        include: [
          {
            model: db.orderImage,
            attributes: ['orderImageId', 'orderImageURL']
          },
          {
            model: db.user,
            as: 'hostInfo',
            attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
          },
          {
            model: db.applicant,
            attributes: ['applicantId']
          }
        ]
      }
    )
    .catch(err => console.error(err));
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
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image'],
          include: [
            {
              model: db.mannerScore,
              as: 'getScore',
              attributes: [[db.sequelize.fn('avg', db.sequelize.col('score')), 'rateAvg']]
            }
          ]
        },
        {
          model: db.applicant,
          attributes: ['userId', 'bidPrice', 'applyComment', 'createdAt']
        }
      ]
    })
    .catch(err => console.error(err));
};

const readMyOrders = async userId => {
  return db.order
    .findAll({
      where: { hostId: userId },
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
              attributes: ['userId', 'phone', 'nickname', 'sex', 'age', 'major', 'introduction', 'image'],
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
        },
        {
          model: db.user,
          as: 'deliverInfo',
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
          /*   include: [
            {}
          ] */
        }
      ]
    })
    .catch(err => console.error(err));
};

const readMyOneOrder = async (userId, orderId) => {
  return db.order
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
          attributes: ['nickname', 'sex', 'age', 'campus', 'major', 'introduction', 'image']
        }
      ]
    })
    .catch(err => console.error(err));
};

const updateMyOrder = async body => {
  const { orderId, hostId, title, departures, arrivals, desiredArrivalTime, details, price, isPrice } = body;
  return await db.order.update(
    { title, departures, arrivals, desiredArrivalTime, details, price, isPrice },
    { where: { orderId, hostId } }
  );
};

const updateMyOrderDeliver = async (orderId, deliverId) => {
  await db.applicant.update({ applyStatus: 'chosen' }, { where: { orderId, userId: deliverId } });
  return await db.order
    .update({ deliverId, deliverStatus: 1 }, { where: { orderId }, silent: true })
    .catch(err => console.error(err));
};

const deleteMyOrder = async (userId, orderId) => {
  return db.order.destroy({ where: { orderId, hostId: userId } }).catch(err => console.error(err));
};

module.exports = {
  createOrder,
  readAllOrders,
  readAllOrdersByCampus,
  readOneOrder,
  readMyOrders,
  readMyOneOrder,
  updateMyOrder,
  updateMyOrderDeliver,
  deleteMyOrder
};
