const express = require('express');
const router = express.Router();

import { getMyInfo, postUserImage, getMyOrders } from '../controllers/userController';
import { checkToken } from '../middlewares/jwt';
import { uploadUserImage } from '../middlewares/s3';
/* GET users listing. */

// router.use('/', checkToken);

router.post('/image', uploadUserImage.array('img'), postUserImage);

router.get('/mypage', getMyInfo);

router.get('/order', getMyOrders);

module.exports = router;
