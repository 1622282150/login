const koa=require('koa')

const Router=require('koa-router')
const bodyParser=require('koa-bodyparser')


const app=new koa()
const router=new Router()
//引入子路由
const subRouter=require('./routes/index')
router.use('/api',subRouter.routes(),subRouter.allowedMethods())

app.use(bodyParser())
app.use(router.routes(),router.allowedMethods())

app.listen(3000,function () {
  console.log('服务器运行')
})
