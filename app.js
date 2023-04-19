var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var apiV1Router = require('./src/routes/apiV1');
const errorHandler = require('./src/middlewares/errorHandler');

var app = express();

app.use(logger('dev'));
app.use('/api', apiV1Router());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
