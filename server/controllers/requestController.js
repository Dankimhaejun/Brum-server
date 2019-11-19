import { vroomRes } from '../middlewares/vroomRes';
import { createRequest, readAllRequests } from '../models/requestModel';
import { createRequestImages } from '../models/requestImageModel';

const postRequest = async (req, res, next) => {
  try {
    const hostId = req.decoded.id;
    const body = req.body;
    const filesArray = req.files;
    body.hostId = hostId;
    console.log('body', body);
    console.log('req.files', req.files);
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
    console.log('getAllRequests', getAllRequests);
    res.json(vroomRes(true, true, null, getAllRequests));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  postRequest,
  getRequests
};
