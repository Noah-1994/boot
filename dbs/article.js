const connection = require('./db')

class Article {
  async create (article) {
    const {
      title,
      content,
      userId,
      categoryId = null
    } = article
    const statement = 'INSERT INTO articles (title, content, user_id, category_id) VALUES (?, ?, ?, ?);'
    const result = await connection.execute(statement, [title, content, userId, categoryId])
    return result[0]
  }

  async getArticleByTitle (title) {
    const result = await connection.execute('SELECT * FROM articles WHERE title = ?;', [title])
    return result[0]
  }

  async getArticleById (id) {
    const result = await connection.execute('SELECT * FROM articles WHERE id = ?;', [id])
    return result[0]
  }

  async getList (params) {
    const { page = 1, pageSize = 10, title = '' } = params
    const result = await connection.execute('SELECT id, title FROM articles WHERE title like ? LIMIT ? OFFSET ?;', [`%${title}%`, `${pageSize}`, `${pageSize * (page - 1)}`])
    return result[0]
  }
}

module.exports = new Article()
