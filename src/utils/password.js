const { hash, compare } = require("bcrypt");

exports.hash = async (plain) => {
  const encrypted = await hash(plain, 12);

  return encrypted;
};

exports.compare = async (plain, encrypted) => {
  const result = compare(plain, encrypted);

  return result;
};