const express = require('express');
const router = express.Router();

import { main, login, register, checkDuplicatedPhone, changePassword, logout } from '../controllers/registerController';

/* GET home page. */
router.get('/', main);

router.post('/register/phone', checkDuplicatedPhone);

router.post('/register', register);

router.post('/login', login);

router.put('/password', changePassword);

router.get('/logout', logout);

module.exports = router;
