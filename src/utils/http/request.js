import request from './http'

function get(url, query, config) {
  return request({
    url,
    method: 'get',
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
