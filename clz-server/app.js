const Koa = require('koa')
const app = new Koa()

const { access } = require('./utils/log')

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 导入mongodb 连接信息 否则无法联通数据库
const db = require('./config/db')
// 路由自动加载功能
const InitManager = require('./core/init')
// 后台跨域设置
const cors = require('koa-cors');
const session = require('koa-session');


// error handler
onerror(app)

// session

app.keys = ['some secret'];

const CONFIG = {
    keyy:'koa:sess',
    maxAge:86400000,
    overWrite:true,
    httpOnly:true,
    rolling:false,
    renew:false,
    siged:true
}
app.use(session(CONFIG,app));
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(cors())
InitManager.initCore(app)


const serverHandle =  (ctx) => {
    access(`${ctx.method} -- ${ctx.url} -- ${ctx.header['user-agent']} -- ${Date.now()}`)
}
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
