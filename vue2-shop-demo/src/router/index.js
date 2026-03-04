import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: { title: '首页 - VueShop' }
  },
  {
    path: '/products',
    name: 'ProductList',
    component: () => import('@/views/ProductList/index.vue'),
    meta: { title: '商品列表 - VueShop' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail/index.vue'),
    meta: { title: '商品详情 - VueShop' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart/index.vue'),
    meta: { title: '购物车 - VueShop' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Checkout/index.vue'),
    meta: { title: '结算 - VueShop', requiresAuth: true }
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: () => import('@/views/OrderSuccess/index.vue'),
    meta: { title: '订单成功 - VueShop' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录 - VueShop' }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// 路由守卫：需要登录的页面
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'VueShop'
  if (to.meta.requiresAuth && !store.getters['user/isLoggedIn']) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
