const express = require('express');
const router = express.Router();
import { getMyInfo } from '../controllers/userController';
import { checkToken } from '../middlewares/jwt';
/* GET users listing. */
router.get('/mypage', checkToken, getMyInfo);

module.exports = router;
