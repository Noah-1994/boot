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
}

module.exports = new Article()
