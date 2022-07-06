const Router = require('koa-router')
const controller = require('../controller/category')

const router = new Router({ prefix: '/categories' })

router.post('/create', controller.create)

module.exports = router
