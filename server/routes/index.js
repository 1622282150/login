const Router=require('koa-router')
const subRouter=new Router()
const UserController=require('../controller/user.js')
const checkToken=require('../token/createToken')
subRouter.post('/register',UserController.register)
subRouter.post('/login',UserController.login)
subRouter.get('/home',UserController.home)
subRouter.post('/create',UserController.create)
subRouter.post('/updateUser',UserController.updateUser)
subRouter.post('/remove',UserController.remove)
subRouter.post('/deletes',UserController.deletes)



module.exports=subRouter
