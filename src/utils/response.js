const { getReasonPhrase } = require("http-status-codes")

exports.sendJson = (res, { error = false, status = 200, data = null, message = getReasonPhrase(status), meta, stack = null }) => {
  return res
    .status(status)
    .json({
      error,
      status,
      data,
      message,
      meta: {
        ...meta,
        serverDate: (new Date()).toString(),
      }
    })
    .end()
}