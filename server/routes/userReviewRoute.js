const express = require('express');
const router = express.Router();

import { postUserReview, putUserReview } from '../controllers/userReviewController';
import { checkToken } from '../middlewares/jwt';
/* GET users listing. */

router.use('/', checkToken);

router.post('/:orderId', postUserReview);

router.put('/:orderId', putUserReview);

module.exports = router;