const connection = require('./db')

class Comment {
  async create (comment) {
    const { content, userId, articleId } = comment
    const statement = 'INSERT INTO comments (content, user_id, article_id) VALUES (?, ?, ?);'
    const result = await connection.execute(statement, [content, userId, articleId])
    return result[0]
  }

  async getCommentById (id) {
    const result = await connection.execute('SELECT * FROM comments WHERE id = ?;', [id])
    return result[0]
  }

  async getList (params) {
    const { page = 1, pageSize = 10, articleId, content = '' } = params
    const statement = 'SELECT comments.id, comments.content, users.nickname, users.avatar FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE article_id = ? AND content like ? LIMIT ? OFFSET ?;'
    const result = await connection.execute(statement, [articleId, `%${content}%`, `${pageSize}`, `${pageSize * (page - 1)}`])
    return result[0]
  }
}

module.exports = new Comment()
