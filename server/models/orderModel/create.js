const db = require('../../../database/models');

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

module.exports = {
  createOrder
};
