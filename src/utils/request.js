import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // withCredentials:true,
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(
  
//   config => {
//     console.log('请求 拦截器')
//     config.headers['Content-Type'] = "application/json;charset=UTF-8"
//     if (getToken()) {
//       config.headers['Authorization'] = getToken()
//     }
//     return config
//   },
//   error => {
//     console.log('请求 拦截器 错误')
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200000是抛错 200004 无数据 可结合自己业务进行修改
     */
    console.log('相应 拦截')
    // console.log(response);
    //  return false
    const res = response.data
    console.log(res.status)
    if (res.status != '200000' && res.status != '200004') {
      console.log('200000')
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 500008:非法的token; 500012:其他客户端登录了;  500014:Token 过期了;
      if (res.status === '500008' || res.status === '500012' || res.status === '500014') {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      console.log('通过 响应 拦截')
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
