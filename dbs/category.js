const connection = require('./db')

class Category {
  async create (category) {
    const {
      categoryName,
      columnId = null
    } = category
    const statement = 'INSERT INTO categories (column_id, category_name) VALUES (?, ?);'
    const result = await connection.execute(statement, [columnId, categoryName])
    return result[0]
  }

  async getCategoryByCategoryName (categoryName) {
    const result = await connection.execute('SELECT * FROM categories WHERE category_name = ?;', [categoryName])
    return result[0]
  }

  async getCategoryById (id) {
    const result = await connection.execute('SELECT * FROM categories WHERE id = ?;', [id])
    return result[0]
  }
}

module.exports = new Category()
