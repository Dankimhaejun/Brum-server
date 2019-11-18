require('dotenv').config();
const jwt = require('jsonwebtoken');
import { vroomRes } from './vroomRes';

const createToken = (id, phone) =>
  new Promise((resolve, reject) => {
    jwt.sign({ id: id, phone: phone }, process.env.JWT_SECRET, { expiresIn: '60day' }, (err, token) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(token);
      resolve(token);
    });
  });

const checkToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json(vroomRes(false, false, 'token is required', null));
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json(vroomRes(false, true, 'Invalidated token, login again'));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = { createToken, checkToken };
