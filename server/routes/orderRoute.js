const express = require('express');
const router = express.Router();

import { postOrder, getOrders, getIdOrder, getAllOrdersByCampus } from '../controllers/orderController';
import { postOrderApply, putOrderApply, deleteOrderApply } from '../controllers/orderApplyController';
import { putOrderStatus } from '../controllers/orderStatusController';
import { checkToken } from '../middlewares/jwt';
import { uploadOrderImages } from '../middlewares/s3';
/* GET home page. */

// getOrders는 토큰 확인 필요없음
router.get('/', getOrders);

router.get('/campus/:campus', getAllOrdersByCampus);

router.use('/', checkToken);

router.get('/:orderId', getIdOrder);

router.post('/', postOrder);

router.post('/:orderId/apply', postOrderApply);

router.put('/:orderId/apply', putOrderApply);

router.delete('/:orderId/apply', deleteOrderApply);

router.put('/:orderId/status/:orderStatus', putOrderStatus);

module.exports = router;
