const db=require('../model/db')
const User=require('../model/User')
const Ur=require('../model/Ur')
//引入密码加密的模块,也可以使用crypto，node原生的模块加密
const sha1=require('sha1')
const moment=require ('moment')
const createToken=require('../token/createToken')
//post请求/register的处理函数
//因为这个处理函数需要将用户名密码写入数据库，我们要在数据库中创建User集合
//通过controller/user。js文件来对数据库进行增删改查
const register =async ctx=>{
  console.log(ctx.request.body)
  //1判断数据库是否有同名的用户，如果存在不允许注册
  //2需要验证数据的合法性  --validator验证，也可以不验证，保险的话前端验完后端再验
  //3注册时通常都需要对时间进行格式化
  //4将注册用户的信息保存在数据库中、
  //5生成token，将成功的注册信息以及token返回给前端
  let username=ctx.request.body.username;
  let password=ctx.request.body.password;
  let doc=await User.getUserByName(username);
  console.log(doc)
  if(doc){
    //说明有重名的用户
    //直接返回一个对象，提醒用户不允许重复注册
    ctx.status=200;
    ctx.body={
      success:false,
      message:'用户名不允许重复'
    }
  }else{
    //说明数据库里边没有重名的用户
    //可以重新注册
    //这里一般为了安全还会对username/password进行二次验证
    //为了节省时间，就不验证了可以用node里边的一个模块validator
    password=sha1(password);
    console.log(password);
    let date=new Date();
    let create_time=moment(date).format('YYYY-MM-DD HH:mm:ss')//当前时间就被格式化为年月日时分秒了
    //生成token
    let token=createToken()
    let newUser=new User({
      username,
      password,
      token,
      create_time
    })
    //将新用户保存到user集合里边

    let userInfo=await new Promise((resolve,reject)=>{
      newUser.save((err,doc)=>{
        if(err){
          reject(err)
        }
        resolve(doc)
      })
    })
      ctx.status=200;
      ctx.body={
        success:true,
        message:'注册成功',
        data:userInfo//有些网站是注册后直接登录的，所以这里把用户的信息也返回了，就是为了兼容那些注册后就直接登录的网站
      }

  }
}
const login=async ctx=>{
  //1检查用户名是否存在 检查密码是否正确
  //2生成token，将token返回给前端，用户登录后token就保留到客户端了
  //每次请求的时候我们都会让用户带着token来访问服务器，服务器通过判断token来确定用户是否是登录状态
  //例如某些需要登录后才能访问的页面，就可以用这个实现权限管理了
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  let doc= await User.getUserByName(username);
  if(doc){
    if(doc.password==sha1(password)){
      let token=createToken(username);
      doc.token=token;
     await new Promise((resolve,reject)=>{
       doc.save((err,doc)=>{
         if(err){
           reject(err)
         }else{
           resolve()
         }
       })
      })
      ctx.status=200
      ctx.body={
       success:true,
        message:'登录成功',
        token:doc.token,
        username:doc.username//登陆的用户名
      }
    }else{
      ctx.status=200;
      ctx.body={
        success:false,
        message:'密码错误请重新输入'
      }
    }
}else{
    ctx.status=200;
    ctx.body={
      success:false,
      message:'用户名不存在'
    }
  }
}



//添加新用户
const create=async ctx=>{
  console.log(ctx.request.body);
  let username=ctx.request.body.username;
  let name=ctx.request.body.name;
  let password=ctx.request.body.password;
  let repeat_password=ctx.request.body.repeat_password;
  let phone=ctx.request.body.phone;
  let email=ctx.request.body.email;
  let is_active=ctx.request.body.is_active;
  let doc=await Ur.getUserByName(username);
  console.log(doc)
  if(doc){
    //说明有重名的用户
    //直接返回一个对象，提醒用户不允许重复注册
    ctx.status=200;
    ctx.body={
      success:false,
      message:'用户名不允许重复'
    }
  }else{
    //说明数据库里边没有重名的用户
    //可以重新注册
    //这里一般为了安全还会对username/password进行二次验证
    //为了节省时间，就不验证了可以用node里边的一个模块validator

    let newUr=new Ur({
      username,
      name,
      password,
      repeat_password,
      phone,
      email,
      is_active,
    })
    //将新用户保存到ur集合里边

    let urInfo=await new Promise((resolve,reject)=>{
      newUr.save((err,doc)=>{
        if(err){
          reject(err)
        }
        resolve(doc)
      })
    })
    ctx.status=200;
    ctx.body={
      success:true,
      message:'添加成功',
      data:urInfo//有些网站是注册后直接登录的，所以这里把用户的信息也返回了，就是为了兼容那些注册后就直接登录的网站
    }
   }
}
//渲染用户
//首页业务逻辑
const home=async ctx=> {
var page = parseInt(ctx.query.page);
  // console.log(page)
  var pageSize = parseInt(ctx.query.pageSize); //每页行数
  // console.log(pageSize)
  var skip = parseInt((page - 1) * pageSize);
  // console.log(skip)
  let doc = await Ur.findData(skip,pageSize);
  let countData = await Ur.countData();
  if (doc) {
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: '表中有数据',
      data: doc,
      count:countData
    }

  } else {
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: '表中没有数据'
    }
  }
}
const updateUser=async ctx=>{

   let id=ctx.request.body._id;
   let name=ctx.request.body.name;
   let phone=ctx.request.body.phone;
   let email=ctx.request.body.email;
   let is_active=ctx.request.body.is_active;

let updateDate=await Ur.updateDate(id,name,phone,email,is_active);
if(updateDate){
  ctx.status=200;
  ctx.body={
    success:true,
    message:'修改成功'
  }

}else{
  ctx.status=200;
  ctx.body={
    success:false,
    message:"修改失败"
  }
}
}
//删除单条数据
const remove=async ctx=>{
  var _id=ctx.request.body._id;
  let deleteDate=await  Ur.delectData(_id)
  if(deleteDate){
    ctx.status=200;
    ctx.body={
      success:true,
      message:'删除成功'
    }
  }else{
    ctx.status=200
    ctx.body={
      success:false,
      message:"删除失败"
    }
  }

}
const deletes=async ctx=>{
  let allData=ctx.request.body;
  let deletesData=await Ur.deleteData(allData);
  if(deletesData){
    ctx.status=200,
      ctx.body={
        success:true,
        message:'删除成功'
      }
  }else{
    ctx.status=200
    ctx.body={
      success:false,
      message:'删除失败'
    }
  }

}
module.exports={
  register,
  login,
  home,
  create,
  updateUser,
  remove,
  deletes

}
