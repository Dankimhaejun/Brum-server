const db = require('../../database/models');

const createRequest = async body => {
  const { title, hostId, departures, arrivals, desiredArrivalTime, details, price, isPrice } = body;
  return db.request
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

const readAllRequests = async () => {
  return await db.request
    .findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: db.requestImage,
          attributes: ['id', 'requestImageURL']
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

const readOneRequest = async requestId => {
  const views = await db.request.findOne({ where: { id: requestId } }).then(result => result.dataValues.views);
  await db.request.update({ views: views + 1 }, { where: { id: requestId }, silent: true });
  return await db.request
    .findOne({
      where: { id: requestId },
      include: [
        {
          model: db.requestImage,
          attributes: ['id', 'requestImageURL']
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

const readMyRequests = async userId => {
  return db.request
    .findAll({
      where: { hostId: userId },
      include: [
        {
          model: db.requestImage,
          attributes: ['id', 'requestImageURL']
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
                  attributes: ['mannerRate']
                  // attributes: ['mannerRate', [db.sequelize.fn('AVG', db.sequelize.col('mannerRate')), 'rateAvg']]
                }
              ]
            }
          ]
        },
        {
          model: db.user,
          as: 'deliver',
          attributes: ['name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
        }
      ]
    })
    .catch(err => console.error(err));
};
module.exports = {
  createRequest,
  readAllRequests,
  readOneRequest,
  readMyRequests
};
