const log4js = require('log4js')
const path = require('path')

log4js.configure({
  appenders: {
    console: { type: 'console' },
    app: {
      type: 'file',
      filename: path.join(__dirname, '../logs/app'),
      maxLogSize: 1024 * 500,
      backups: 2,
      pattern: '_yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    errorFile: {
      type: 'file',
      filename: path.join(__dirname, '../logs/error'),
      maxLogSize: 1024 * 500,
      backups: 2,
      pattern: '_yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: [
        'app',
        'console'
      ],
      level: 'debug'
    },
    error: { appenders: ['errorFile'], level: 'error' }
  },
  replaceConsole: true
})

const defaultLogger = log4js.getLogger()
const errorLogger = log4js.getLogger('error')

module.exports = {
  defaultLogger,
  errorLogger
}
