const express = require('express');
const router = express.Router();

import {
  getMyOrders,
  getMyOneOrder,
  getMyOrderApplicant,
  putMyOrderApplicant,
  deleteMyOneOrder
} from '../controllers/userOrderController';

import { checkToken } from '../middlewares/jwt';

router.use('/', checkToken);

router.get('/', getMyOrders);

router.get('/:orderId', getMyOneOrder);

router.get('/:orderId/applicant', getMyOrderApplicant);

router.put('/:orderId/applicant', putMyOrderApplicant);

router.delete('/:orderId', deleteMyOneOrder);

module.exports = router;
