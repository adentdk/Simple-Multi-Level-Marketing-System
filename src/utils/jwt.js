const { sign, verify } = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET
const expiresIn = process.env.JWT_EXPIRES

exports.signToken = (payload) => {
  const token = sign(payload, secretKey, {
    expiresIn,
  });

  return token;
};

exports.verifyToken = (token) => {
  try {
    const encodedToken = verify(token, secretKey);

    return Promise.resolve(encodedToken);
  } catch (error) {
    return Promise.reject(error);
  }
};