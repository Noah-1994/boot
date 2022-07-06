const { defaultLogger, errorLogger } = require('../utils/log')
const {
  UNAUTHORIZED
} = require('../config/responseCode')

module.exports = async (ctx, next) => {
  try {
    await next()
    defaultLogger.debug(ctx.url)
  } catch (err) {
    if (err.status === 401) {
      ctx.fail('用户未登陆', UNAUTHORIZED)
    } else {
      errorLogger.error(err)
      ctx.fail(err.message || err)
    }
  }
}
