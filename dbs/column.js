const connection = require('./db')

class Column {
  async create (user) {
    const { columnName } = user
    const statement = 'INSERT INTO columns (column_name) VALUES (?);'
    const result = await connection.execute(statement, [columnName])
    return result[0]
  }

  async getColumnByColumnName (columnName) {
    const result = await connection.execute('SELECT * FROM columns WHERE column_name = ?;', [columnName])
    return result[0]
  }

  async getColumnByColumnId (columnId) {
    const result = await connection.execute('SELECT * FROM columns WHERE id = ?;', [columnId])
    return result[0]
  }
}

module.exports = new Column()
