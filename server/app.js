require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const registerRouter = require('./routes/registerRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const userOrderRouter = require('./routes/userOrderRoute');
const userChatRouter = require('./routes/userChatRoute');
const userLikeOrderRouter = require('./routes/userLikeOrderRoute.js');

const app = express();

//동적 요청에 대한 응답을 보낼 때 etag 생성을 하지 않도록 설정
app.set('etag', false);
// 정적 요청에 대한 응답을 보낼 때 etag 생성을 하지 않도록 설정
const options = { etag: false };
app.use(express.static('public', options));

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Routes
app.use('/', registerRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/user/order', userOrderRouter);
app.use('/user/chat', userChatRouter);
app.use('/user/like/order', userLikeOrderRouter);

// app.use('/user', express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next();
});

module.exports = app;
