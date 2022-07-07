const { Rule, validate } = require('../utils/validate')
const validator = require('validator')
const categoryDb = require('../dbs/category')
const db = require('../dbs/article')
const tagDb = require('../dbs/tag')
const utils = require('../utils')

class ArticleController {
  async create (ctx, next) {
    const { title, content, categoryId, tagId } = ctx.request.body

    const errMessage = validate([
      new Rule(() => !utils.isEmpty(title), '文章名不能为空'),
      new Rule(() => validator.isLength(title, { min: 1, max: 10 }), '文章名长度只能为1～10个字符'),
      new Rule(() => validator.matches(title, /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/), '文章名只能由汉字、数字、字母和下划线组成'),
      new Rule(() => !utils.isEmpty(content), '内容不能为空')
    ])
    if (errMessage) {
      return ctx.fail(errMessage)
    }

    if (categoryId) {
      const existCategory = await categoryDb.getCategoryById(categoryId)
      if (!existCategory.length) return ctx.fail('类目不存在')
    }

    if (tagId) {
      const existTag = await tagDb.getTagById(tagId)
      if (!existTag.length) {
        return ctx.fail('标签不存在')
      }
    }

    const existArticle = await db.getArticleByTitle(title)
    if (existArticle.length) {
      return ctx.fail('文章名已被占用')
    }

    const article = await db.create({
      title,
      content,
      userId: ctx.state.user.id,
      categoryId
    })

    await tagDb.linkArticle({
      tagId,
      articleId: article.insertId
    })

    ctx.success(1, '文章创建成功')
  }

  async getList (ctx, next) {
    const { page, pageSize, title } = ctx.query
    const res = await db.getList({
      page, pageSize, title
    })
    ctx.success(res)
  }
}

module.exports = new ArticleController()
