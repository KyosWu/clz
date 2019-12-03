import axios from 'axios'
// import { Message } from 'element-ui'
// const httpHelper = {}
// 配置Vue插件
// httpHelper.install = function fn (Vue) {
//   axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
//   Vue.prototype.$http = axios
// }
const httpAxios = {}
httpAxios.install = function (Vue) {
  const instance = axios.create({
    baseURL: '/api'
  })
  /* 暂时关闭 */
  // instance.interceptors.request.use(function (config) {
  //   if (config.url.toLowerCase() !== 'login') {
  //     const token = sessionStorage.getItem('token')
  //     config.headers.Authorization = token
  //   }
  //   return config
  // }, function (error) {
  //   return Promise.reject(error)
  // })
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器,保存到本地sessionStorage
  // axios.interceptors.response.use(function (response) {
  //   // 对响应数据做点什么
  //   localStorage.setItem(response.config.url, JSON.stringify(response))
  //   return response;
  // }, function (error) {
  //   // 对响应错误做点什么
  //   return JSON.parse(localStorage.getItem(error.config.url))
  // });
  Vue.prototype.$axios = instance
}
// export default httpHelper
export default httpAxios
