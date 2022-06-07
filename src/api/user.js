import requestMethods from '@/utils/http/request'

export default {
  login(data) {
    return requestMethods.post(`/vue-element-admin/user/login`, data)
  },
  getInfo(data) {
    return requestMethods.post(`/vue-element-admin/user/info`, data)
  },
  logout(data) {
    return requestMethods.post(`/vue-element-admin/user/logout`, data)
  },
}
