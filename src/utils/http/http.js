import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let loadingInstance

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    loadingInstance = Loading.service({ fullscreen: true })
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    config.headers['Authorization'] =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IjEiLCJuaWNrbmFtZSI6IueuoeeQhuWRmCIsImV4cCI6MTY1NzE3NjMwNH0.r-ebue_jnAZGfyE8wPPf5aka4jpgUnleiLUEwVvKX4e7IlrGt05SI6oB-isHSFtFOiN1khYlaj-Xvsd1hZ0lnw'
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    loadingInstance.close()
    const res = response.data
    if (Number(res.code) !== 200 && Number(res.code) !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
