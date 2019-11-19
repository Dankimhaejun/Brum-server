const express = require('express');
const router = express.Router();
import { checkToken } from '../middlewares/jwt';
import { postRequest, getRequests } from '../controllers/requestController';
import { uploadRequestImages } from '../middlewares/s3';
/* GET home page. */
router.post('/', checkToken, uploadRequestImages.array('file'), postRequest);

router.get('/', checkToken, getRequests);
module.exports = router;
