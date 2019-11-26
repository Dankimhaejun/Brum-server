const express = require('express');
const router = express.Router();

import { getAllChatsByUserId } from '../controllers/userChatController';

import { checkToken } from '../middlewares/jwt';

router.use('/', checkToken);

router.get('/', getAllChatsByUserId);

module.exports = router;
