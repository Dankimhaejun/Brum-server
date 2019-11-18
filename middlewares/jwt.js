require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (id, phone) =>
  new Promise((resolve, reject) => {
    jwt.sign({ id: id, phone: phone }, process.env.JWT_SECRET, { expiresIn: '30day' }, (err, token) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(token);
      resolve(token);
    });
  });

module.exports = { createToken };
