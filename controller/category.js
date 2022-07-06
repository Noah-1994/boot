const { Rule, validate } = require('../utils/validate')
const validator = require('validator')
const db = require('../dbs/category')
const columnDb = require('../dbs/column')
const utils = require('../utils')

class Controller {
  async create (ctx, next) {
    const { categoryName, columnId } = ctx.request.body

    const errMessage = validate([
      new Rule(() => !utils.isEmpty(categoryName), '类目名不能为空'),
      new Rule(() => validator.isLength(categoryName, { min: 3, max: 10 }), '类目名长度只能为3～10个字符'),
      new Rule(() => validator.matches(categoryName, /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/), '类目名只能由汉字、数字、字母和下划线组成')
    ])
    if (errMessage) {
      return ctx.fail(errMessage)
    }

    if (columnId) {
      const existColumn = await columnDb.getColumnByColumnId(columnId)
      if (!existColumn.length) return ctx.fail('专栏不存在')
    }

    const existCategory = await db.getCategoryByCategoryName(categoryName)
    if (existCategory.length) {
      return ctx.fail('类目名已被占用')
    }
    await db.create({
      categoryName,
      columnId
    })
    ctx.success(1, '类目创建成功')
  }
}

module.exports = new Controller()
