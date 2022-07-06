const { Rule, validate } = require('../utils/validate')
const validator = require('validator')
const columnDb = require('../dbs/column')
const utils = require('../utils')

class ColumnController {
  async create (ctx, next) {
    const { columnName } = ctx.request.body

    const errMessage = validate([
      new Rule(() => !utils.isEmpty(columnName), '专栏名不能为空'),
      new Rule(() => validator.isLength(columnName, { min: 3, max: 10 }), '专栏名长度只能为3～10个字符'),
      new Rule(() => validator.matches(columnName, /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/), '专栏名只能由汉字、数字、字母和下划线组成')
    ])
    if (errMessage) {
      return ctx.fail(errMessage)
    }

    const existColumn = await columnDb.getColumnByColumnName(columnName)
    if (existColumn.length) {
      return ctx.fail('专栏名已被占用')
    }
    await columnDb.create({
      columnName
    })
    ctx.success(1, '专栏创建成功')
  }
}

module.exports = new ColumnController()
