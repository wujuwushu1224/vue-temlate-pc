import Router from 'vue-router'
import Vue from 'vue'
import home from './home'  // 首页路由统一
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes:[
    ...home,
  ]
})

router.beforeEach((to, from ,next)=>{
  next()
})

export default router
