/****
 * 封装请求工具 request.js
 * 对于 axios的二次封装
 * 配置拦截器 以及其他
 * ****/
import axios from 'axios'
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
// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
// 回调函数第一个参数 是响应体
// 在拦截器中需要将数据返回
  return response.data ? response.data : { } // 有的接口 没有任何的响应数据
// 成功的时候执行
}, function () {
// 失败的时候执行
})
export default axios
