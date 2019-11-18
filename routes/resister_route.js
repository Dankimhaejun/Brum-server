const express = require('express');
const router = express.Router();
import {
  main,
  login,
  resister,
  checkDuplicatedPhone
} from '../controllers/resister_controller';

/* GET home page. */
router.get('/', main);

router.post('/resister/phone', checkDuplicatedPhone);

router.post('/resister', resister);

router.post('/login', login);

module.exports = router;
