const db = require('../../database/models');

const createOrder = async body => {
  const { title, hostId, departures, arrivals, desiredArrivalTime, details, price, isPrice } = body;
  return db.order
    .create({
      title,
      hostId,
      departures,
      arrivals,
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
      order: [['id', 'ASC']],
      include: [
        {
          model: db.orderImage,
          attributes: ['id', 'orderImageURL']
        },
        {
          model: db.user,
          as: 'host',
          attributes: ['name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
        }
        //TODO: 상세한 정보 필요시 참고해서 추가할 것!!!!!!!
        // {
        //   model: db.applicant,
        //   attributes: ['bidPrice', 'createdAt'],
        //   include: [
        //     {
        //       model: db.user,
        //       as: 'applicant',
        //       attributes: ['id', 'phone', 'name', 'sex', 'age', 'major', 'introduction', 'image'],
        //       include: [
        //         {
        //           model: db.mannerRate,
        //           attributes: [[db.sequelize.fn('AVG', db.sequelize.col('mannerRate')), 'rateAvg']]
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   model: db.user,
        //   as: 'deliver',
        //   attributes: ['name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
        // }
      ]
    })
    .catch(err => console.error(err));
};

const readOneOrder = async orderId => {
  const views = await db.order.findOne({ where: { id: orderId } }).then(result => result.dataValues.views);
  await db.order.update({ views: views + 1 }, { where: { id: orderId }, silent: true });
  return await db.order
    .findOne({
      where: { id: orderId },
      include: [
        {
          model: db.orderImage,
          attributes: ['id', 'orderImageURL']
        },
        {
          model: db.user,
          as: 'host',
          attributes: ['name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
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
          attributes: ['id', 'orderImageURL']
        },
        // {
        //   model: db.user,
        //   as: 'host',
        //   attributes: ['name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
        // },
        {
          model: db.applicant,
          attributes: ['bidPrice', 'createdAt'],
          include: [
            {
              model: db.user,
              foreignKey: 'applicantId',
              attributes: ['id', 'phone', 'name', 'sex', 'age', 'major', 'introduction', 'image'],
              include: [
                {
                  model: db.mannerRate,
                  foreignKey: 'rateeId',
                  // attributes: ['mannerRate']
                  attributes: [[db.sequelize.fn('AVG', db.sequelize.col('mannerRate')), 'rateAvg']]
                }
              ]
            }
          ]
        },
        {
          model: db.user,
          as: 'deliver',
          attributes: ['name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
          /*   include: [
            {}
          ] */
        }
      ]
    })
    .catch(err => console.error(err));
};
module.exports = {
  createOrder,
  readAllOrders,
  readOneOrder,
  readMyOrders
};