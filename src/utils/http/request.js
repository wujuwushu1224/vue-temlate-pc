import request from './http'

function get(url, method, query, config) {
  return request({
    url,
    method,
    params: query,
    ...config,
  })
}

function post(url, query, config) {
  return request({
    url,
    method: 'post',
    params: query,
    ...config,
  })
}

const requestMethods = {
  post,
  get,
}
export default requestMethods