const Router = require('koa-router')
const controller = require('../controller/article')

const router = new Router({ prefix: '/articles' })

router.post('/create', controller.create)
router.get('/get-list', controller.getList)

module.exports = router
