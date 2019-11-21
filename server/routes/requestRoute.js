const express = require('express');
const router = express.Router();

import { checkToken } from '../middlewares/jwt';
import { postRequest, getRequests, getIdRequest } from '../controllers/requestController';
import { uploadRequestImages } from '../middlewares/s3';
/* GET home page. */

router.use('/', checkToken);

router.get('/', getRequests);

router.get('/:id', getIdRequest);

router.post('/', uploadRequestImages.array('file'), postRequest);

module.exports = router;
