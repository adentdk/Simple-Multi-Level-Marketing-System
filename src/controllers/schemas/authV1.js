const { object, string } = require("yup");

exports.login = object({
  body: object({
    username: string().max(32).required(),
    password: string().required(),
  })
})