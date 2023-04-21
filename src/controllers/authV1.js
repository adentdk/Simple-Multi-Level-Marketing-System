'use strict'
const { StatusCodes } = require('http-status-codes');
const {
  User,
} = require('../models');
const response = require('../utils/response');

exports.login = async (req, res, next) => {
  const {
    body: {
      username,
      password
    }
  } = req

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'error username or password'
      }
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'error username or password'
      }
    }

    const tokens = user.getToken();

    return response.sendJson(res, {
      data: tokens
    })

  } catch (error) {
    next(error)
  }
}