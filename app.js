const koa = require("koa")
const app = new koa()

const koaBody = require("koa-body")
const onerror = require('koa-onerror')
const logger = require('koa-logger')

const config = require('./config/config')
const registerRouter = require('./routes')

// error handler
onerror(app)

// middlewares
app.use(logger())
app.use(koaBody({multipart:true}))
app.use(registerRouter())

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - $ms`)
})

// start server
module.exports = app.listen(config.port, "0.0.0.0", () => {
    console.log(`Listening on http://localhost:${config.port}`)
})
