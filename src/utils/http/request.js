import request from './http'

function get(url, query, config) {
  return request({
    url,
    method: 'get',
    params: query,
    ...config,
  })
}

function post(url, data, config) {
  return request({
    url,
    method: 'post',
    data,
    ...config,
  })
}

const requestMethods = {
  post,
  get,
}
export default requestMethods
