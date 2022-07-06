const Router = require('koa-router')
const UserController = require('../controller/user')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.get('/getCurrentUser', UserController.getCurrentUser)

userRouter.post('/update', UserController.update)
userRouter.post('/remove', UserController.remove)

module.exports = userRouter
