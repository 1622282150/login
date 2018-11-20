const mongoose = require('mongoose')
//创建我们的数据库集合的架构
//这里边指定集合里边的字段，字段的类型
const UserScheam=new mongoose.Schema({
 //常用的数据类型
  //string  number date boolean objectid array
  username:String,
  password:String,
  token:String,
 create_time:String
})
UserScheam.statics={
 getUserByName:function (username) {
   return new Promise((resolve,reject)=>{
     User.findOne({username},(err,doc)=>{
       if(err){
         reject(err)
       }else{
         resolve(doc)
       }
     })
   })
 }
}
//生成模型，说白了就是创建一个集合
//第一个参数是模型的名字，集合的名字
//第二个参数是集合使用的架构
const User= mongoose.model('User',UserScheam)
module.exports=User;
//所有的操作都是在User模型上，例如查询的时候User.find()/findOne;
//例如修改时User.delete()
//添加的时候let newUser=  new User() ----->newUser.save()
