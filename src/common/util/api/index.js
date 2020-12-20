import axios from 'axios'
import { Message } from 'element-ui'
import router from '@src/router'

// axios 配置
axios.defaults.timeout = 5000

// POST传参序列化
axios.interceptors.request.use((config) => {
  config.headers.common['Authorization'] = localStorage.getItem('token');
  return config
}, (err) => {
  Message.error('参数错误')
  return Promise.reject(err)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  const response = res.data
  if (response.msg) {
    if (response.code === 0) {
      Message.success(response.msg)
    } else {
      Message.error(response.msg)
    }
  }
  return response
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 401:
        router.replace('/login');
        Message.error('未授权，请登录')
        break
      case 404:
        Message.error('接口请求异常: ' + err.response.config.url + ', 请重试')
        break
      default:
        Message.error('Oops, 出错啦')
    }
  }
  return Promise.reject(err)
})

let request = function(method, url, data) {
  // 处理请求的url和数据
  data = method === 'get' ? { params: data } : data
  // 发送请求
  return new Promise((resolve, reject) => {
    axios[method](url, data)
      .then(response => {
        resolve(response)
      }, error => {
        reject(error)
      })
      .catch(error => {
        reject(error)
      })
  })
  .catch(error => {
    console.log(error)
  })
}

export default {
  get: (url, data) => request('get', url, data),
  post: (url, data) => request('post', url, data),
  put: (url, data) => request('put', url, data),
  delete: (url, data) => request('delete', url, data)
}