const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const { Rule, validate } = require('../utils/validate')
const { PRIVATE_KEY } = require('../config')
const validator = require('validator')
const crypto = require('crypto')
const uuid = require('uuid')
const userDb = require('../dbs/user')
const utils = require('../utils')

class UserController {
  async register (ctx, next) {
    const { nickname, password, gender, phone, birthday } = ctx.request.body
    let avatar = null

    const errMessage = validate([
      new Rule(() => !utils.isEmpty(nickname), '昵称不能为空'),
      new Rule(() => validator.isLength(nickname, { min: 5, max: 10 }), '昵称长度只能为5～10个字符'),
      new Rule(() => validator.matches(nickname, /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/), '昵称只能由汉字、数字、字母和下划线组成'),
      new Rule(() => !utils.isEmpty(password), '密码不能为空'),
      new Rule(() => validator.isLength(password, { min: 5, max: 10 }), '密码长度只能为5～10个字符'),
      new Rule(() => validator.matches(password, /^[_a-zA-Z0-9]+$/), '密码只能由数字、字母和下划线组成'),
      new Rule(() => utils.isEmpty(gender) || validator.matches(gender, /^(男|女)$/), '性别格式不正确'),
      new Rule(() => utils.isEmpty(phone) || validator.isMobilePhone(phone, 'zh-CN'), '手机号格式不正确'),
      new Rule(() => utils.isEmpty(birthday) || validator.isDate(birthday), '出生日期格式不正确')
    ])
    if (errMessage) {
      return ctx.fail(errMessage)
    }

    const existUser = await userDb.getUserByNickname(nickname)
    if (existUser.length) {
      return ctx.fail('昵称已被占用')
    }

    if (ctx.request.files.avatar) {
      const file = ctx.request.files.avatar
      const reader = fs.createReadStream(file.filepath)
      const stream = fs.createWriteStream(path.join('upload', uuid.v1() + path.extname(file.originalFilename)))
      reader.pipe(stream)
      avatar = stream.path
    }
    await userDb.create({
      nickname,
      password: crypto.createHash('md5').update(password).digest('hex'),
      gender,
      phone,
      birthday,
      avatar
    })
    ctx.success(1, '用户创建成功')
  }

  async login (ctx, next) {
    const { nickname, password } = ctx.request.body
    const user = await userDb.login({
      nickname, password: crypto.createHash('md5').update(password).digest('hex')
    })
    if (!user.length) {
      return ctx.fail('账号或密码错误')
    }
    const token = jwt.sign({ nickname, id: user[0].id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.success({
      token
    })
  }

  async getCurrentUser (ctx, next) {
    const { nickname } = ctx.state.user
    const user = await userDb.getUserByNickname(nickname)
    ctx.success(user)
  }

  async update () {

  }

  async remove () {

  }

  async info (ctx, next) {
    console.log(ctx.state)
    ctx.body = 'info'
  };
}

module.exports = new UserController()
