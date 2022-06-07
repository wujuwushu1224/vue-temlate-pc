import requestMethods from '@/utils/http/request'

export default {
  /**
   * 城市信息列表
   **/
  getCityInfoList(query) {
    return requestMethods.post(`/common/getCityInfoList`, query)
  },
}
