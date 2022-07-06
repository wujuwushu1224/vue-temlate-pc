import requestMethods from '@/utils/http/request'

export default {
  /**
   * 城市信息列表
   **/
  getCityInfoList(query) {
    return requestMethods.post(`/common/getCityInfoList`, query)
  },
  // 字典管理->获取所有字典
  selectAllDictionary(params) {
    return requestMethods.postFromData('/tbDictionary/selectAllDictionary', params)
  },
  getCityDiscover(body) {
    return requestMethods.get('/cityDiscover/getCityDiscover', body);
  },
}
