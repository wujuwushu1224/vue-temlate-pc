import requestMethods from '../http/request'

export default {
  /**
   * 城市信息列表
   **/
  getCityInfoList(hasMap = false) {
    return requestMethods.post(`/common/getCityInfoList?hasMap=${hasMap}`)
  },
}
