/*
* redis存入没显示，不知道是不是没有cookie问题
*
*
* */


const Koa = require('koa')
// const { access } = require('./utils/log')
// koa-generic-session 会话
const session = require("koa-session");
// koa-redis
const redisStore = require('./config/redis-store');
// 日志记录功能
const morgan = require('koa-morgan')
// 引入redis配置
const redis = require('./config/redis')
// 路径和文件操作
const path = require('path')
const fs = require('fs')
// 后台跨域设置
const cors = require('koa-cors')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// 优化请求输出格式
const logger = require('koa-logger')
// 导入mongodb 连接信息 否则无法联通数据库
const mongoDB = require('./config/mongoDB')
// 路由自动加载功能
const InitManager = require('./core/init')
// graphql
const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const schema = require("./graphql/schema");


const app = new Koa()

// error handler
onerror(app)

const ENV = process.env.NODE_ENV
// 生产环境 需要改成ENV ！=== 'production'
if (ENV !== 'production') {
    // 开发环境 / 测试环境
    app.use(morgan('dev'));
} else {
    // 线上环境
    const logFileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    })
    app.use(morgan('combined', {
        stream: writeStream
    }));
}
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


app.keys = ['kkk'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// 提供外部 Store
    store: new redisStore(redis),
}
// session 配置
app.use(session(CONFIG, app))

// graphql 示例路由
app.use(
    mount(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true
        })
    )
);

app.use(cors())
InitManager.initCore(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
