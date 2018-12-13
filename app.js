const koa = require("koa")
const app = new koa()

const static = require("koa-static")
const path = require("path")
const views = require("koa-views")
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
app.use(static(path.join(__dirname, "static")))
app.use(views(path.join(__dirname, "views"), {extension:"ejs", map:{html:"ejs"}}))
app.use(registerRouter())

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - $ms`)
})

// start server
module.exports = app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`)
})
