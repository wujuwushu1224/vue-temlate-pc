import axios from './http'
import qs from 'qs'

function get(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
      ...config
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

function post(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params),{
      ...config
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

function postJson(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url,  params,{
      ...config
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
const requestMethods = {
  post,
  get,
  postJson
}
export default requestMethods
