const express = require('express');
const router = express.Router();
import { main, login, resister, checkDuplicatedPhone, changePassword, logout } from '../controllers/resisterController';

/* GET home page. */
router.get('/', main);

router.post('/resister/phone', checkDuplicatedPhone);

router.post('/resister', resister);

router.post('/login', login);

router.put('/password', changePassword);

router.get('/logout', logout);
module.exports = router;
