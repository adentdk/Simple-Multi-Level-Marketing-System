const { StatusCodes } = require("http-status-codes");
const jwt = require('../utils/jwt')

const mustLogin = async (req, res, next) => {
  const {
    headers: {
      authorization
    }
  } = req;
  try {
    if (!authorization) {
      throw new Error()
    }

    const token = authorization.replace('Bearer ', '');

    const decodedToken = await jwt.verifyToken(token);
    req.auth = decodedToken;
    
    next()
  } catch (error) {
    next({
      ...error,
      status: StatusCodes.UNAUTHORIZED,
    });
  }

};

module.exports = mustLogin