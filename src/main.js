import Vue from 'vue'
import App from './App.vue'
import router from  './router/index'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import './style/reset.css'
import * as filter from './utils/filter.js'
import api from './api/index'
import * as global from './utils/util'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$global = global
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
