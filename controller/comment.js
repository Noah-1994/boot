const { Rule, validate } = require('../utils/validate')
const db = require('../dbs/comment')
const articleDb = require('../dbs/article')
const utils = require('../utils')

class Controller {
  async create (ctx, next) {
    const { content, articleId } = ctx.request.body

    const errMessage = validate([
      new Rule(() => !utils.isEmpty(content), '评论不能为空'),
      new Rule(() => !utils.isEmpty(articleId), '文章id不能为空')
    ])
    if (errMessage) {
      return ctx.fail(errMessage)
    }

    const existArticle = await articleDb.getArticleById(articleId)
    if (!existArticle.length) return ctx.fail('文章id不存在')

    await db.create({
      content,
      userId: ctx.state.user.id,
      articleId
    })
    ctx.success(1, '评论添加成功')
  }

  async getList (ctx, next) {
    const { page, pageSize, content, articleId } = ctx.query

    const errMessage = validate([
      new Rule(() => !utils.isEmpty(articleId), '文章id不能为空')
    ])
    if (errMessage) {
      return ctx.fail(errMessage)
    }

    const res = await db.getList({
      page, pageSize, content, articleId
    })
    ctx.success(res)
  }
}

module.exports = new Controller()
