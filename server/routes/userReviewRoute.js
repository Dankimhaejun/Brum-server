const express = require('express');
const router = express.Router();

import { getAllMyReviews, postUserReview, putUserReview, deleteUserReview } from '../controllers/userReviewController';
import { checkToken } from '../middlewares/jwt';
/* GET users listing. */

router.use('/', checkToken);

router.get('/', getAllMyReviews);

router.post('/:orderId', postUserReview);

router.put('/:orderId', putUserReview);

router.delete('/:orderId', deleteUserReview);

module.exports = router;
