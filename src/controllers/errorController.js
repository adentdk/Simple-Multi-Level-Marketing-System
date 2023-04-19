const {StatusCodes} = require('http-status-codes');

exports.methodNotAllowed = (req, res, next) => {
  return next({
    status: StatusCodes.METHOD_NOT_ALLOWED,
  });
}

exports.notFound = (req, res, next) => {
  return next({
    status: StatusCodes.NOT_FOUND,
  });
}

exports.notAuthorized = (req, res, next) => {
  return next({
    status: StatusCodes.UNAUTHORIZED,
  });
}
