import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
//这种是默认的加载组建的方式。所有的组件都会被扔到app.js这个文件里边，当组件过多的时候
// import Home from 'pages/Home'
// import Login from 'pages/Login'
// import  Register from 'pages/Register'
// import  Error from 'pages/error'

const Login = resolve=>{
  require.ensure(['pages/Login.vue'],()=>{
    resolve(require('pages/Login.vue'))
  })
}
const Home = resolve=>{
  require.ensure(['pages/Home.vue'],()=>{
    resolve(require('pages/Home.vue'))
  })
}
const Register= resolve=>{
  require.ensure(['pages/Register.vue'],()=>{
    resolve(require('pages/Register.vue'))
  })
}
const Error= resolve=>{
  require.ensure(['pages/Error.vue'],()=>{
    resolve(require('pages/Error.vue'))
  })
}

//让路由规则生效
Vue.use(Router)
//暴露了一个路由对象
const router= new Router({
  mode:'history',
  routes: [
    { path:'/',
      component:Home ,//如果用户访问的是首页的话。就让他加载home组件
      //在需要权限的页面路由中，添加一个requireauth字段
     meta:{
       requireAuth:true
     }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'*',
      component:404
    }

  ]
})
router.beforeEach((to,frrom,next)=>{
  //获取下token
  let token =store.state.token;
  if(to.meta.requireAuth){
    //是否需要权限的页面
       if(token){
         next() //token存在则让它通过
       }else{
       next({
         path:'/login'
       })
    }
  }else{
    next()
  }
})
export default router
