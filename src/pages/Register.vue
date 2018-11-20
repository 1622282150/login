<template >
  <div >

    <el-row>
      <el-col :span="24">
        <el-menu router @select="handleSelect" :default-active="activeIndex" mode="horizontal"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item  index="/login">登录</el-menu-item>
          <el-menu-item  index="/register">注册</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>


    <el-main class="bg-dark">
      <el-row>
        <el-col :span="12" :offset="7">
          <el-form  :model="regForm"  label-width="100px" :rules="rules" ref="regForm"  :label-position="'left'">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="regForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input type="password" v-model="regForm.checkPassword"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="submitForm('regForm')">注册</el-button>
              <el-button type="danger" @click="resetForm('regForm')">重置</el-button>

            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
    </el-main>

  </div>

</template>

<script>
//  引入request发送的axio实例
import request from '../util/request'   //service
  export default {
    name:'Register',
      data(){
      let validatorPass=(rule,value,callback)=>{
        let reg=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
        if(!reg.test(value)){
          callback(new Error('密码必须是数字和字母的组合，长度是6-16位'))
        }else{
          callback()
        }
      };
      let validatorPass2=(rule,value,callback)=>{
        if(value!==this.regForm.password){
          callback(new Error('两次密码输入不一，请重新输入'))
        }else{
          callback();
        }
      }
      return{
        //绑定的表单数据
        regForm:{
          username:'',
          password:'',
          checkPassword:''
        },
        activeIndex:'/register',
        rules:{
          //用户名的验证规则
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'},
            {min:6,max:16,message:'用户名要在6-16位之间',trigger:'blur'}
          ],
          //密码的验证规则
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            {validator:validatorPass,trigger:'blur'}
          ],
          //确认密码的验证规则
          checkPassword:[
            {required:true,message:'请再次输入密码',trigger:'blur'},
            {validator:validatorPass2,trigger:'blur'}

          ]
        }

      }
    },
    methods:{
      handleSelect:function (key,keypath) {
        console.log(keypath)
      },
      resetForm:function (formName) {
        this.$refs[formName].resetFields();
      },
      submitForm:function (forName) {
        this.$refs[forName].validate((valid)=>{
          if(valid){
            //  验证成功发送请求
            request({
              url:"/api/register",
              method:'post',
              data:this.regForm
            }).then(({data})=>{
              let success=data.success;
              let message=data.message;
              let userInfo=data.data;
              if(success){
                //成功后跳转
                this.$router.push('/login');
              }else{
                this.$message.success(message)
              }
            }).catch(err=>{
              console.log(err);
            })
          }else {
            console.log('验证失败');
            return false;
          }
        })
      }
    }
  }


</script>
<style scoped type="text/scss">

  .el-row{
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .bg-dark
  {
    background: #f1f1f1;
  }

</style>
