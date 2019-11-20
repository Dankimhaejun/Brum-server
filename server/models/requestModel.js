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
  return await db.request.findAll({
    include: [
      {
        model: db.requestImage,
        attributes: ['id', 'requestImage']
      },
      {
        model: db.user,
        as: 'host',
        attributes: ['name', 'sex', 'age', 'university', 'major', 'introduction', 'image']
      },
      {
        model: db.applicant,
        attributes: ['bidPrice', 'createdAt'],
        include: [
          {
            model: db.user,
            as: 'applicant',
            attributes: ['id', 'phone', 'name', 'sex', 'age', 'major', 'introduction', 'image'],
            include: [
              {
                model: db.mannerRate
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
  });
};

module.exports = {
  createRequest,
  readAllRequests
};
