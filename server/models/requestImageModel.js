const db = require('../../database/models');

const createRequestImages = async (filesArray, requestId) => {
  for (let i = 0; i < filesArray.length; i++) {
    await db.requestImage
      .create({
        requestId: requestId,
        requestImageURL: filesArray[i].location
      })
      .catch(err => console.error(err));
  }
  return;
};
module.exports = {
  createRequestImages
};
