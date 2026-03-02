import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 懒加载路由（代码分割）
const HomeView     = () => import('../views/HomeView.vue')
const ArticleList  = () => import('../views/ArticleList.vue')
const ArticleDetail = () => import('../views/ArticleDetail.vue')
const AboutView    = () => import('../views/AboutView.vue')
const NotFound     = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { title: '首页' }
  },
  {
    path: '/articles',
    name: 'article-list',
    component: ArticleList,
    meta: { title: '文章列表' }
  },
  {
    // 动态路由段 :id，通过 props 传递给组件
    path: '/articles/:id',
    name: 'article-detail',
    component: ArticleDetail,
    props: true,
    meta: { title: '文章详情' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: '关于' }
  },
  {
    path: '*',
    component: NotFound,
    meta: { title: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 全局前置守卫：动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Router Demo` : 'Router Demo'
  next()
})

export default router
