const crypto = require('crypto');
require('dotenv').config();

const hashPassword = async password =>
  await crypto
    .createHmac('sha256', process.env.HASH_SALT)
    .update(password)
    .digest('hex');

module.exports = { hashPassword };
