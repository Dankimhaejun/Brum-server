const express = require('express');
const router = express.Router();

import { getMyInfo, postUserImage, getMyOrders } from '../controllers/userController';
import { checkToken } from '../middlewares/jwt';
import { uploadUserImage } from '../middlewares/s3';
/* GET users listing. */

router.use('/', checkToken);

router.get('/mypage', getMyInfo);

router.get('/order', getMyOrders);

router.post('/image', uploadUserImage.single('file'), postUserImage);

module.exports = router;
