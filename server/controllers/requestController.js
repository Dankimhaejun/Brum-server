import { vroomRes } from '../middlewares/vroomRes';
import { createRequest, readAllRequests, readOneRequest } from '../models/requestModel';
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
    console.error(e);
    next(e);
  }
};

const getRequests = async (req, res, next) => {
  try {
    const getAllRequests = await readAllRequests();
    const userId = req.decoded.id;
    res.json(vroomRes(true, true, null, { userId: userId, requests: getAllRequests }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getIdRequest = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const requestId = req.params.id;
    const getRequest = await readOneRequest(requestId);
    res.json(vroomRes(true, true, null, { userId: userId, request: getRequest }));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  postRequest,
  getRequests,
  getIdRequest
};
