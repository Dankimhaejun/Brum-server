const express = require('express');
const router = express.Router();

import {
  getMyInfo,
  updateUserImage,
  updateUserCampus,
  checkAuthAndPutEmail,
  checkAuthCode
} from '../controllers/userController';
import { checkToken } from '../middlewares/jwt';
import { uploadUserImage } from '../middlewares/s3';
/* GET users listing. */

router.use('/', checkToken);

router.get('/mypage', getMyInfo);

router.put('/image', uploadUserImage.single('file'), updateUserImage);

router.put('/campus', updateUserCampus);

router.put('/email', checkAuthAndPutEmail);

router.put('/email/authentication', checkAuthCode);

module.exports = router;
