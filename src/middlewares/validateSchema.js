const { StatusCodes } = require("http-status-codes");

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    console.log(error)
    next({
      ...error,
      status: StatusCodes.UNPROCESSABLE_ENTITY
    })
  }
};

module.exports = validateSchema