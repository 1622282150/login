var mongoose = require('mongoose');
var shortid = require('shortid');
var UrSchema = new mongoose.Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  username:{
    type:String,
    require:true
  },
  name:{
    type:String
  },
  password:{
    type:String
  },
  phone:{
    type:Number
  },
  email:{
    type:String
  },
  create_time:{
    type:Date,
    default:Date.now
  },
  is_active:{
    type:Boolean,
    default:false
  }
})
UrSchema.statics={
  getUserByName:function (username) {
    return new Promise((resolve,reject)=>{
      Ur.findOne({username},(err,doc)=>{
        if(err){
          reject(err)
        }else{
          resolve(doc)
        }
      })
    })
  }
  //find方法
  ,findData:function (skip,pageSize) {
    return new Promise((resolve,reject)=>{
      Ur.find({})
        .skip(skip)
        .sort({'create_time':-1})
        .limit(pageSize)
        .exec((err,doc)=>{
          if(err){
            reject(err)
          }else {
            resolve(doc)
          }
        })
    })
  },
  //获取数据库中数据总条数
  countData:function(){
    return new Promise((resolve,reject)=>{
      Ur.find({}).countDocuments({},(err,count)=>{
        if(err){
          reject(err)
        }else {
          resolve(count)
          console.log(count)
        }
      })
    })
  },

  //修改数据
  updateDate:function (id,name,phone,email,is_active) {
    return new Promise((resolve,reject)=>{
      Ur.updateOne({'_id':id},{name,phone,email,is_active},(err,doc)=>{
        if(err){
          reject(err)
        }else{
          resolve(doc)
        }
      })

    })
  },
//  删除单条数据
  delectData:function (_id) {
    return new Promise((resolve,reject)=>{
      Ur.deleteOne({'_id':_id},(err,doc)=>{
        if(err){
          reject(err)
        }else{
          resolve(doc)
        }
      })
    })
  }
,
  //删除多条数据
  deleteData:function(allData){
    return new Promise((resolve,reject)=>{
      allData.forEach((data)=>{
        Ur.deleteOne({'_id':data._id},(err,doc)=>{
          if(err){
            reject(err)
          }else{
            resolve(doc)
          }

        })

      })
    })
  }
}

var Ur= mongoose.model('Ur',UrSchema)
module.exports=Ur;
