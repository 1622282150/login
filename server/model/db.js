const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/mylogin',{useNewUrlParser:true})//创建一个mylogin数据库
const db=mongoose.connection;
mongoose.Promise=global.Promise;
db.on('error',function () {
  console.log('数据库连接失败')
})
db.on('open',function () {
  console.log('数据库连接成功')
})
