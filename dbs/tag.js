const connection = require('./db')

class Tag {
  async create (tag) {
    const { tagName } = tag
    const statement = 'INSERT INTO tags (tag_name) VALUES (?);'
    const result = await connection.execute(statement, [tagName])
    return result[0]
  }

  async getTagByName (name) {
    const result = await connection.execute('SELECT * FROM tags WHERE tag_name = ?;', [name])
    return result[0]
  }

  async getTagById (id) {
    const result = await connection.execute('SELECT * FROM tags WHERE id = ?;', [id])
    return result[0]
  }

  async linkArticle (relation) {
    const { tagId, articleId } = relation
    const statement = 'INSERT INTO article_tag_relations (tag_id, article_id) VALUES (?, ?);'
    const result = await connection.execute(statement, [tagId, articleId])
    return result[0]
  }
}

module.exports = new Tag()
