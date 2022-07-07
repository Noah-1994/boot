const Router = require('koa-router')
const controller = require('../controller/comment')

const router = new Router({ prefix: '/comments' })

router.post('/create', controller.create)
router.get('/get-list', controller.getList)

module.exports = router
