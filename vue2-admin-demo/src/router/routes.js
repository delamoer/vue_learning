/**
 * 路由配置
 *
 * 知识点：
 * 1. 静态路由（constantRoutes）：所有人可访问，无需登录
 * 2. 动态路由（asyncRoutes）：需要登录，可按角色过滤（本项目简化为全员可见）
 * 3. meta 字段约定：
 *    - title:     页面标题（面包屑/标签页显示）
 *    - icon:      Element UI icon 类名（菜单图标）
 *    - hidden:    true → 侧边栏不显示此菜单
 *    - affix:     true → TagsView 标签不可关闭
 *    - keepAlive: true → 路由切换时缓存此组件
 *    - roles:     ['admin'] → 指定角色可访问（权限控制）
 * 4. 嵌套路由：layout 包裹所有需要侧边栏的页面
 */

// 懒加载：路由组件按需加载，减少首屏体积
const Layout = () => import(/* webpackChunkName: "layout" */ '@/components/layout/AppLayout')

// ─────────────────────────────────────────────────────────
// 静态路由：无需登录即可访问
// ─────────────────────────────────────────────────────────
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/LoginView'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "err" */ '@/views/ErrorView403'),
    meta: { title: '无权限', hidden: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "err" */ '@/views/ErrorView404'),
    meta: { title: '页面不存在', hidden: true }
  }
]

// ─────────────────────────────────────────────────────────
// 动态路由：需要登录的业务页面（嵌套在 Layout 内）
// ─────────────────────────────────────────────────────────
export const asyncRoutes = [
  // 根路径重定向到仪表盘
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/DashboardView'),
        meta: { title: '仪表盘', icon: 'el-icon-odometer', affix: true, keepAlive: true }
      }
    ]
  },

  // ── 用户管理 ───────────────────────────────────────
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/UserListView'),
        meta: { title: '用户列表', icon: 'el-icon-user', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'detail/:id',
        name: 'UserDetail',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/UserDetailView'),
        meta: { title: '用户详情', hidden: true, roles: ['admin', 'superAdmin'] }
      }
    ]
  },

  // ── 文章管理 ───────────────────────────────────────
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleListView'),
        meta: { title: '文章列表', icon: 'el-icon-document' }
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleEditView'),
        meta: { title: '新建文章', hidden: true, roles: ['admin', 'superAdmin', 'editor'] }
      },
      {
        path: 'edit/:id',
        name: 'ArticleEdit',
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleEditView'),
        meta: { title: '编辑文章', hidden: true, roles: ['admin', 'superAdmin', 'editor'] }
      },
      {
        path: 'detail/:id',
        name: 'ArticleDetail',
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/ArticleDetailView'),
        meta: { title: '文章详情', hidden: true }
      }
    ]
  },

  // ── 个人资料 ───────────────────────────────────────
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/ProfileView'),
        meta: { title: '个人资料', icon: 'el-icon-setting', hidden: true }
      }
    ]
  },

  // 兜底：404（必须放最后）
  { path: '*', redirect: '/404', meta: { hidden: true } }
]

export default [...constantRoutes, ...asyncRoutes]
