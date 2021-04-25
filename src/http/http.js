import axios from 'axios'

axios.defaults.timeout = 360000
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}
// 在向服务器发送前，修改请求数据
axios.defaults.transformRequest = [function (data) {
  return data
}]
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error);
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.error(error)
  }
)
export default axios
