const express = require('express');
const router = express.Router();

import { getAllOrdersUserLike } from '../controllers/userLikeOrderController';
import { checkToken } from '../middlewares/jwt';
/* GET users listing. */

router.use('/', checkToken);

router.get('/', getAllOrdersUserLike);

module.exports = router;
