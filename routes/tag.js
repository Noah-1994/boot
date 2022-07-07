const Router = require('koa-router')
const controller = require('../controller/tag')

const router = new Router({ prefix: '/tags' })

router.post('/create', controller.create)

module.exports = router
