const db = require('../../database/models');

const createRequestImages = async (filesArray, requestId) => {
  for (let i = 0; i < filesArray.length; i++) {
    await db.requestImage.create({
      requestId: requestId,
      requestImage: filesArray[i].location
    });
  }
  return;
};
module.exports = {
  createRequestImages
};
