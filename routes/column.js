const Router = require('koa-router')
const columnController = require('../controller/column')

const columnRouter = new Router({ prefix: '/columns' })

columnRouter.post('/create', columnController.create)

module.exports = columnRouter
