const express = require('express');
const router = express.Router();

import { getMyInfo, postUserImage } from '../controllers/userController';
import { checkToken } from '../middlewares/jwt';
import { uploadUserImage } from '../middlewares/s3';
/* GET users listing. */

router.post('/image', uploadUserImage.single('file'), postUserImage);

router.use('/', checkToken);

router.get('/mypage', getMyInfo);

module.exports = router;
