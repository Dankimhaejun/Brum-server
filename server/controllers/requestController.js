import { vroomRes } from '../middlewares/vroomRes';
import { createRequest, readAllRequests } from '../models/requestModel';
import { createRequestImages } from '../models/requestImageModel';

const postRequest = async (req, res, next) => {
  try {
    const hostId = req.decoded.id;
    const body = req.body;
    const filesArray = req.files;
    body.hostId = hostId;
    const newRequest = await createRequest(body);
    const requestId = newRequest.dataValues.id;
    if (filesArray.length) {
      await createRequestImages(filesArray, requestId);
    }
    return res.json(vroomRes(true, true, null, 'Created new request'));
  } catch (e) {
    next(e);
  }
};

const getRequests = async (req, res, next) => {
  try {
    const getAllRequests = await readAllRequests();
    const userId = req.decoded.id;
    res.json(vroomRes(true, true, null, { userId: userId, requests: getAllRequests }));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  postRequest,
  getRequests
};
