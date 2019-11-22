const express = require('express');
const router = express.Router();

import { checkToken } from '../middlewares/jwt';
import {
  postOrder,
  getOrders,
  getIdOrder,
  postOrderApply,
  putOrderApply,
  deleteOrderApply
} from '../controllers/orderController';
import { uploadOrderImages } from '../middlewares/s3';
/* GET home page. */

// getOrders는 토큰 확인 필요없음
router.get('/', getOrders);

router.use('/', checkToken);

router.get('/:orderId', getIdOrder);

router.post('/', uploadOrderImages.array('file'), postOrder);

router.post('/:orderId/apply', postOrderApply);

router.put('/:orderId/apply', putOrderApply);

router.delete('/:orderId/apply', deleteOrderApply);

module.exports = router;
