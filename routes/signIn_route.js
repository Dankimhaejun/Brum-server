const express = require('express');
const router = express.Router();
import { main } from '../controllers/signIn_controller';

/* GET home page. */
router.get('/', main);

module.exports = router;
