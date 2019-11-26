const express = require('express');
const router = express.Router();

import { checkToken } from '../middlewares/jwt';
import {
  postOrder,
  getOrders,
  getIdOrder,
  postOrderApply,
  putOrderApply,
  deleteOrderApply,
  getAllOrdersByCampus
} from '../controllers/orderController';
import { uploadOrderThumbnail, uploadOrderImages } from '../middlewares/s3';
/* GET home page. */

// getOrders는 토큰 확인 필요없음
router.get('/', getOrders);

router.get('/campus/:campus', getAllOrdersByCampus);

router.use('/', checkToken);

router.get('/:orderId', getIdOrder);

router.post('/', uploadOrderThumbnail.single('thumbnail'), uploadOrderImages.array('file'), postOrder);

router.post('/:orderId/apply', postOrderApply);

router.put('/:orderId/apply', putOrderApply);

router.delete('/:orderId/apply', deleteOrderApply);

module.exports = router;
