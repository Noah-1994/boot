const connection = require('./db')

class User {
  async create (user) {
    const { nickname, password, gender = null, phone = null, birthday = null, avatar = null } = user
    const statement = 'INSERT INTO users (nickname, password, gender, phone, birthday, avatar) VALUES (?, ?, ?, ?, ?, ?);'
    const result = await connection.execute(statement, [nickname, password, gender, phone, birthday, avatar])
    return result[0]
  }

  async getUserByNickname (nickname) {
    const result = await connection.execute('SELECT * FROM users WHERE nickname = ?;', [nickname])
    return result[0]
  }

  async login (user) {
    const { nickname, password } = user
    const statement = 'SELECT * FROM users WHERE nickname = ? AND password = ?;'
    const result = await connection.execute(statement, [nickname, password])
    return result[0]
  }

  async updateUserByNickname (avatarUrl, userId) {

  }
}

module.exports = new User()
