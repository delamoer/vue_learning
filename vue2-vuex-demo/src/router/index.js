// router/index.js
import Vue       from 'vue'
import VueRouter from 'vue-router'
import store     from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/ShopView.vue'),
    meta: { title: '商城' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
    meta: { title: '购物车', requiresAuth: true }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/UserView.vue'),
    meta: { title: '用户中心', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录' }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 })
})

// 全局前置守卫 — 结合 Vuex 做权限控制
router.beforeEach((to, from, next) => {
  // 设置页面 title
  document.title = to.meta.title ? `${to.meta.title} | Vuex Demo` : 'Vue2 Vuex Demo'

  const isLoggedIn   = store.getters['user/isLoggedIn']
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)

  if (requiresAuth && !isLoggedIn) {
    // 未登录跳登录页，记录来源
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
