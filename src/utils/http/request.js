import request from './http'

const transformRequest = [
  function(data) {
    let ret = ''
    for (const it in data) {
      ret += it + '=' + (data[it] !== null ? data[it] : '') + '&'
    }
    ret = ret.substring(0, ret.lastIndexOf('&'))
    return ret
  },
]

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

function postFromData(url, data, config) {
  return request({
    url,
    method: 'post',
    data,
    ...config,
    transformRequest: transformRequest,
  })
}

const requestMethods = {
  post,
  get,
  postFromData,
}
export default requestMethods
