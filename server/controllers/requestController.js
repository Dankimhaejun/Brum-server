import { vroomRes } from '../middlewares/vroomRes';
import { createRequest } from '../models/requestModel';
const postRequest = async (req, res, next) => {
  const { id } = req.decoded;
  const body = req.body;
  body.hostId = id;
  console.log('body', body);
  console.log('req.files', req.files.length);
  const isSuccessCreateRequest = await createRequest(body);
  res.send();
};

module.exports = {
  postRequest
};
