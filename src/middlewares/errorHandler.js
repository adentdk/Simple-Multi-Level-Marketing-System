const {StatusCodes} = require('http-status-codes');

const response = require('../utils/response')

const errorHandler = async (error, req, res, next) => {
  if (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;

    const payload = {
      error: true,
      message: error.message,
      status,
      data: null,
      stack: null,
    };

    if (error.fields) {
      payload.data = {
        fields: error.fields
      }
    }

    if (process.env.NODE_ENV === 'development') {
      payload.stack = error.stack;
    }

    return response.sendJson(res, payload)
  }

  return next();
};

module.exports = errorHandler;
