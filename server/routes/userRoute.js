const express = require('express');
const router = express.Router();
import { getMyInfo, postUserImage } from '../controllers/userController';
import { checkToken } from '../middlewares/jwt';
import { uploadUserImage } from '../middlewares/s3';
/* GET users listing. */
router.get('/mypage', checkToken, getMyInfo);

router.post('/image', checkToken, uploadUserImage.single('file'), postUserImage);
module.exports = router;
