const express = require('express');

const app = express();

const morgan = require('morgan');

const toursRouter = require('./routes/toursRouter');

const usersRouter = require('./routes/usersRouter');

////////////////
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  //morgan gives nice console logs
  app.use(morgan('dev'));
}
// a middleware, allows express to deal with data comming from the http request body
app.use(express.json());

// The order of the middleware matters, it should come before the concerned route
app.use((req, res, next) => {
  console.log('Welcome from middleware ... 🤓');
  // attach a time to the coming request
  req.requestTime = new Date().toISOString();
  next();
});

///////////////////////
// 3) ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

///////////////////////
// exporting server app
module.exports = app;
