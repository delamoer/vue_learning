import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    // ⭐ 路由懒加载：首页直接加载（主路由不懒加载，避免首屏白屏）
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '/env',
    name: 'Env',
    // ⭐ 懒加载 + 命名 chunk
    component: () => import(/* webpackChunkName: "features" */ '@/views/EnvView.vue'),
    meta: { title: '环境变量' }
  },
  {
    path: '/style',
    name: 'Style',
    component: () => import(/* webpackChunkName: "features" */ '@/views/StyleView.vue'),
    meta: { title: 'Sass 样式系统' }
  },
  {
    path: '/perf',
    name: 'Performance',
    component: () => import(/* webpackChunkName: "features" */ '@/views/PerformanceView.vue'),
    meta: { title: '性能优化' }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "err" */ '@/views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 滚动行为：切换路由时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})

// 全局守卫：更新页面标题
router.beforeEach((to, from, next) => {
  const baseTitle = process.env.VUE_APP_APP_TITLE || 'Vue CLI Demo'
  document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
  next()
})

export default router
