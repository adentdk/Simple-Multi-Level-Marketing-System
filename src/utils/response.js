exports.sendJson = (res, { status = 200, data = null, message = 'OK', meta, stack = null }) => {
  return res
    .status(status)
    .json({
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