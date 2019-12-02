const express = require('express');
const router = express.Router();

import { getAllOrdersUserLike, postUserLikeOrder, deleteUserLikeOrder } from '../controllers/userLikeOrderController';
import { checkToken } from '../middlewares/jwt';
/* GET users listing. */

router.use('/', checkToken);

router.get('/', getAllOrdersUserLike);

router.post('/:orderId', postUserLikeOrder);

router.delete('/:orderId', deleteUserLikeOrder);

module.exports = router;
