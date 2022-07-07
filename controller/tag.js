const { Rule, validate } = require('../utils/validate')
const validator = require('validator')
const db = require('../dbs/tag')
const utils = require('../utils')

class Controller {
  async create (ctx, next) {
    const { tagName } = ctx.request.body

    const errMessage = validate([
      new Rule(() => !utils.isEmpty(tagName), '标签名不能为空'),
      new Rule(() => validator.isLength(tagName, { min: 1, max: 10 }), '标签名长度只能为1～10个字符'),
      new Rule(() => validator.matches(tagName, /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/), '标签名只能由汉字、数字、字母和下划线组成')
    ])
    if (errMessage) {
      return ctx.fail(errMessage)
    }

    const exist = await db.getTagByName(tagName)
    if (exist.length) {
      return ctx.fail('标签名已被占用')
    }
    await db.create({
      tagName
    })
    ctx.success(1, '标签创建成功')
  }
}

module.exports = new Controller()
