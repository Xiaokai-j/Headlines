/****
 * 封装请求工具 request.js
 * 对于 axios的二次封装
 * 配置拦截器 以及其他
 * ****/
import axios from 'axios'
// import { promise } from 'dns'
import router from '@/router' // 路由实例对象
import JSONBig from 'json-bigint' // 引入地方处理大数字的包
// 拦截器及其他操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头

axios.interceptors.request.use(function (config) {
  // 成功时执行第一个  参数 会有一个 config  config 就是所有axios的请求参数
  // 在第一个函数中需要将配置进行返回  返回的配置会作为请求参数进行请求
  // 在但会之前就是我们统一注入token的最佳时间
  const token = localStorage.getItem('user-token')// 从兜里拿钥匙 也就是从缓存中取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
// 失败是会有一个错误 直接reject错误即可
// 失败时执行第二个 axios 是一个支持promise
// 如果失败了我们应该直接reject  reject会直接金进入到axios
  return Promise.reject(error)
})
// 对axios的 返回数据进行自定义处理 用json-bigint替代原来的json
// 这主要处理id超过 大数字的时候 转化 不正确的问题 JSONBig.parse 是第三方的包 内部怎么实现的 不需要关心
axios.defaults.transformResponse = [function (data) {
  // 用json-bigint的转化来做
  // 这里需要判断一下 data 是不是为空 如果为空就不能转化了
  return data ? JSONBig.parse(data) : {}
}]
// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
// 回调函数第一个参数 是响应体
// 在拦截器中需要将数据返回
  return response.data ? response.data : { } // 有的接口 没有任何的响应数据
// 成功的时候执行
}, function (error) {
// 失败的时候执行
// error 是错误对象 里面包含了错误的状态码 和 响应信息
// 401状态码 表示用户状态认证失败 用户身份不对
// 401出现的时候 表示 拿错钥匙/钥匙过期/钥匙没拿/钥匙格式不对
// 之前的导航守卫  校验了token 有没有
//
  if (error.response.status === 401) {
    localStorage.removeItem('user-token') // 删除钥匙
    router.push('/login') // 直接导入路由实例对象使用跳转方式和组件中的this.$router是一样的
    //   跳回登录页
  }
  //   进行错误的处理
  return Promise.reject(error)
})
export default axios
