const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const User = require('./schemas/User')

// 初始化DB
// const db = mongoose.connect('mongodb://localhost/grapgql')

mongoose.connect('mongodb://localhost:27017/grapgql', {
  useNewUrlParser: true
}, async (err,ok) => {
  console.log("db connect done")
})


app.use(bodyParser())


app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get("X-Response-Time")

  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', ms)
})

const appRouter = require('koa-router')()

appRouter.get('/', async (ctx, next) => {
  let data = await User.find()
  ctx.body = {
    data
  }
})
appRouter.post('/', async (ctx, next) => {
  ctx.body = {
    method: 'post',
    text: 'Hello world',
  }
})
app.use(appRouter.routes())

app.listen(3000)

console.log('server starting....')