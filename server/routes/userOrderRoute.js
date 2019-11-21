const express = require('express');
const router = express.Router();

import { getMyOrders, getMyOneOrder, getMyOrderApplicant } from '../controllers/userOrderController';
import { checkToken } from '../middlewares/jwt';

router.use('/', checkToken);

router.get('/', getMyOrders);

router.get('/:orderId', getMyOneOrder);

router.get('/:orderId/applicant', getMyOrderApplicant);

module.exports = router;
