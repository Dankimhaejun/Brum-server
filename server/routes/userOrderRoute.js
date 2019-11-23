const express = require('express');
const router = express.Router();

import {
  getMyOrders,
  getMyOneOrder,
  putMyOneOrder,
  deleteMyOneOrder,
  getMyOrderApplicant,
  putMyOrderApplicant
} from '../controllers/userOrderController';

import { checkToken } from '../middlewares/jwt';

router.use('/', checkToken);

router.get('/', getMyOrders);

router.get('/:orderId', getMyOneOrder);

router.put('/:orderId', putMyOneOrder);

router.delete('/:orderId', deleteMyOneOrder);

router.get('/:orderId/applicant', getMyOrderApplicant);

router.put('/:orderId/applicant', putMyOrderApplicant);

module.exports = router;
