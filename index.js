const path = require('path')
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const KoaJwt = require('koa-jwt')

const { PUBLIC_KEY } = require('./config')
const log = require('./middleware/log')
const formatData = require('./middleware/formatData')
const useRoutes = require('./routes')
require('./dbs/db')

const app = new Koa()

app.use(formatData)
app.use(log)
app.use(KoaJwt({
  secret: PUBLIC_KEY,
  algorithm: 'RS256'
}).unless({
  path: [/login/, /register/]
}))

app.use(KoaBody({
  multipart: true
}))
app.use(KoaStatic(path.join(__dirname, 'static')))
useRoutes(app)

app.listen(3000)
