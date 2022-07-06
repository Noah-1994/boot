const {
  DEFAULT_SUCCESS,
  DEFAULT_ERROR
} = require('../config/responseCode')

module.exports = async (ctx, next) => {
  ctx.type = 'json'

  ctx.success = (data, message = 'success') => {
    ctx.body = {
      status: true,
      code: DEFAULT_SUCCESS,
      message,
      data
    }
  }

  ctx.fail = (message = '系统错误', code = DEFAULT_ERROR) => {
    ctx.body = {
      status: false,
      code,
      message
    }
  }

  await next()
}
