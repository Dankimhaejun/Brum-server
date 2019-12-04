const express = require('express');
const router = express.Router();

import { getAllChatsByUserId, getChatDetailByOrderId, postChatImageReturnUrl } from '../controllers/userChatController';

import { checkToken } from '../middlewares/jwt';

router.use('/', checkToken);

router.get('/', getAllChatsByUserId);

router.get('/:orderId', getChatDetailByOrderId);

router.post('/:orderId', postChatImageReturnUrl);

module.exports = router;
