import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import axios from '@/utils/request' // 引入封装的引入封装的request.js
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import Components from '@/components'
import '@/styles/index.less' // 引入样式
import '@/permission' // 引入权限模块
Vue.config.productionTip = false
Vue.use(Components) // 注册开发自定义组件
Vue.use(ElementUI) // 全局注册element-ui框架 一旦全局注册 所有的位置都可以使用组件
// Vue.use实际上 会调用element-ui 里面的install方法

// 配置axios的baseURL
Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
