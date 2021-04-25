import Vue from 'vue'
import App from './App.vue'
import router from  './router/index'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import './style/reset.css'

import api from './api/index'

Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
