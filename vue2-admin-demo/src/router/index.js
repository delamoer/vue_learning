/**
 * Vue Router 入口 + 全局导航守卫
 *
 * 知识点：
 * 1. beforeEach 全局前置守卫
 *    - 未登录 → 白名单以外全部跳登录页
 *    - 已登录 → 访问 /login 跳仪表盘
 *    - 已登录但无用户信息 → 重新获取（页面刷新场景）
 * 2. afterEach → 更新页面 title、关闭进度条
 * 3. NProgress → 路由跳转进度条
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import store from '@/store'
import { getToken } from '@/utils/auth'

Vue.use(VueRouter)

// NProgress 配置
NProgress.configure({ showSpinner: false })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),  // 路由切换滚动到顶部
  routes
})

// 白名单：无需登录即可访问的路径
const WHITE_LIST = ['/login', '/403', '/404']

// ─── 全局前置守卫 ─────────────────────────────────────────
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const token = getToken()

  if (token) {
    // ── 已登录 ──────────────────────────────────────
    if (to.path === '/login') {
      // 已登录访问登录页 → 重定向到仪表盘
      next({ path: '/dashboard' })
      NProgress.done()
      return
    }

    // 判断是否已获取用户信息（刷新页面后 store 被重置）
    const userInfo = store.getters['auth/userInfo']
    if (!userInfo) {
      try {
        await store.dispatch('auth/fetchUserInfo')
      } catch {
        // 获取用户信息失败（token 已失效）→ 清除并跳登录
        await store.dispatch('auth/logout')
        next({ path: '/login', query: { redirect: to.fullPath } })
        NProgress.done()
        return
      }
    }

    // 角色权限检查（如果路由配置了 meta.roles）
    const { roles } = to.meta || {}
    if (roles && roles.length) {
      const userRoles = store.getters['auth/roles']
      const hasAccess = userRoles.some(r => roles.includes(r))
      if (!hasAccess) {
        next('/403')
        NProgress.done()
        return
      }
    }

    next()
  } else {
    // ── 未登录 ──────────────────────────────────────
    if (WHITE_LIST.includes(to.path)) {
      next()   // 白名单路径直接放行
    } else {
      // 保存目标路径，登录成功后跳回
      next({ path: '/login', query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

// ─── 全局后置守卫 ─────────────────────────────────────────
router.afterEach(to => {
  NProgress.done()

  // 更新页面 title
  const baseTitle = process.env.VUE_APP_TITLE || 'Vue Admin'
  document.title = to.meta?.title ? `${to.meta.title} - ${baseTitle}` : baseTitle

  // 加入 TagsView（多标签页记录）
  if (!to.meta?.hidden) {
    store.dispatch('tagsView/addView', to)
  }
})

export default router
