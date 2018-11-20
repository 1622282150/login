// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//import在es6中是引入一个模块的意思，结构式：import 名字  from  模块的地址
//在一个js文件中引入另外一个js文件
import Vue from 'vue'  //引入vue模块
import App from './App'  //引入vue的根组件
import router from './router'//引入router文件夹下的index。js
import  ElementUI from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css'
import  '@/styles/main.scss'
import store from '@/store'
//项目运行的时候 是否要开启提示 如果实在调试阶段的话，建议开启，上线后关闭
Vue.config.productionTip=true

//使用elementui作为前端框架
Vue.use(ElementUI)
Vue.filter('formatter',function(value){
  if(value == true){
    return '启用'
  }
  return '停用'
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
