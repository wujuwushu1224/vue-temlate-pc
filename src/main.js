import Vue from 'vue'

import App from './App.vue'
import router from './router/index'

import './icons' // icon

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import * as filter from './filter'
import api from './api/index'
import * as global from './utils'
import store from './store'
import './icons' // icon

Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$global = global

Object.keys(filter).forEach((key) => {
  Vue.filter(key, filter[key])
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
