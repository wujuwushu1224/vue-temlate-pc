import requestMethods from '@/utils/http/request'

export default {
  login(data) {
    return requestMethods.post(`/vue-element-admin/user/login`, data)
  },
  getInfo(token) {
    return requestMethods.get(`/vue-element-admin/user/info`, { token })
  },
  logout() {
    return requestMethods.post(`/vue-element-admin/user/logout`)
  },
}
