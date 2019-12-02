const express = require('express');
const router = express.Router();

import { postUserReview } from '../controllers/userReviewController';
import { checkToken } from '../middlewares/jwt';
/* GET users listing. */

router.use('/', checkToken);

router.post('/:orderId', postUserReview);

module.exports = router;
