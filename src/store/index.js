//开始进行状态管理
//简单理解：组件和组件之间是无法做到相互共享数据的，必须通过prop/emit来传值
//我们通过vuex可以添加一些全局共享数据或者是共享方法,可以在任何组件使用
import Vuex from 'vuex'
import Vue from 'vue'
//2分别引入应的文件
import state from './state'
import  mutations from './mutations'
import  actions from './actions'
//使得vuex生效
Vue.use(Vuex)
//1首先创建一个store实例
const store=new Vuex.Store(
  {//3将全局的变量放到vuex实例里边
    //在外边就可以正常访问
    state,
    mutations,
    actions,
  }
)
export default  store
