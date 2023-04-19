const {StatusCodes} = require('http-status-codes');

const response = require('../utils/response')

const errorHandler = async (error, req, res, next) => {
  if (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;

    const payload = {
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

    if (process.env === 'development') {
      payload.stack = error.stack;
    }

    if (error.t) {
      try {
        await error.t.rollback();
      } catch (e) {
        console.log('ROLLBACK ERROR')
      }
    }

    return response.sendJson(res, payload)
  }

  return next();
};

module.exports = errorHandler;
