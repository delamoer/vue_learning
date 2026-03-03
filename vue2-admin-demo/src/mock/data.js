/**
 * Mock 原始数据
 *
 * 知识点：前端 Mock 策略
 * - 方式一：axios-mock-adapter 拦截 xhr（需安装依赖）
 * - 方式二（本项目）：API 层根据 VUE_APP_ENABLE_MOCK 返回静态数据
 *   优点：无额外依赖；缺点：不模拟网络延迟和错误码
 *
 * 模拟延迟函数：await delay(300) 模拟网络请求耗时
 */

export const delay = (ms = 300) =>
  new Promise(resolve => setTimeout(resolve, ms))

// 成功响应包装（对应 request.js 中 res.code === 0 的约定）
export const ok = (data) => ({ code: 0, data, message: 'ok' })

// ─── 用户数据 ─────────────────────────────────────────
export const MOCK_USERS = [
  { id: 1, username: 'superAdmin', name: '超级管理员', email: 'super@example.com', avatar: '', roles: ['superAdmin'], status: 1, createTime: '2024-01-01 08:00:00', department: '技术部' },
  { id: 2, username: 'admin',      name: '张三',       email: 'admin@example.com', avatar: '', roles: ['admin'],      status: 1, createTime: '2024-02-10 09:30:00', department: '运营部' },
  { id: 3, username: 'editor',     name: '李四',       email: 'editor@example.com',avatar: '', roles: ['editor'],     status: 1, createTime: '2024-03-15 14:20:00', department: '内容部' },
  { id: 4, username: 'viewer',     name: '王五',       email: 'viewer@example.com',avatar: '', roles: ['viewer'],     status: 0, createTime: '2024-04-01 11:00:00', department: '市场部' },
  { id: 5, username: 'zhangwei',   name: '张伟',       email: 'zw@example.com',    avatar: '', roles: ['editor'],     status: 1, createTime: '2024-05-20 16:45:00', department: '内容部' },
  { id: 6, username: 'liuyang',    name: '刘洋',       email: 'ly@example.com',    avatar: '', roles: ['viewer'],     status: 1, createTime: '2024-06-08 10:30:00', department: '财务部' }
]

// Mock 账号对应密码（实际项目中密码通过后端校验）
export const MOCK_ACCOUNTS = {
  superAdmin: '123456',
  admin:      '123456',
  editor:     '123456',
  viewer:     '123456',
  zhangwei:   '123456',
  liuyang:    '123456'
}

// 生成 mock token（正常应由后端JWT生成）
export const genToken = (username) => `mock_token_${username}_${Date.now()}`

// ─── 文章数据 ─────────────────────────────────────────
export const MOCK_ARTICLES = [
  { id: 1,  title: 'Vue 2 组件通信完全指南',           category: 'tech',    status: 'published', author: '张三', authorId: 2, views: 1520, createTime: '2024-03-01 10:00:00', updateTime: '2024-03-05 14:00:00', summary: '全面介绍 Vue 2 中 props/$emit/EventBus/provide/inject 等通信方式' },
  { id: 2,  title: 'Vuex 状态管理最佳实践',             category: 'tech',    status: 'published', author: '李四', authorId: 3, views: 2089, createTime: '2024-03-10 09:00:00', updateTime: '2024-03-12 11:00:00', summary: '企业级 Vuex 模块化、命名空间、持久化方案' },
  { id: 3,  title: 'Vue CLI 5 工程化配置详解',          category: 'tech',    status: 'draft',     author: '张伟', authorId: 5, views: 0,    createTime: '2024-03-20 15:00:00', updateTime: '2024-03-20 15:00:00', summary: 'vue.config.js 深度解析，additionalData、chainWebpack、proxy' },
  { id: 4,  title: '后台管理系统权限设计与实现',         category: 'arch',   status: 'published', author: '张三', authorId: 2, views: 3456, createTime: '2024-04-01 08:00:00', updateTime: '2024-04-03 16:00:00', summary: '动态路由、按钮级权限、v-permission 指令实现' },
  { id: 5,  title: 'Axios 二次封装与接口管理规范',       category: 'tech',    status: 'published', author: '刘洋', authorId: 6, views: 987,  createTime: '2024-04-15 11:00:00', updateTime: '2024-04-15 11:00:00', summary: '请求/响应拦截器、统一错误处理、接口模块化' },
  { id: 6,  title: 'Element UI 主题定制实战',           category: 'ui',      status: 'draft',     author: '李四', authorId: 3, views: 0,    createTime: '2024-05-01 13:00:00', updateTime: '2024-05-01 13:00:00', summary: '通过 CSS 变量和 SCSS 覆盖定制 Element UI 主题' },
  { id: 7,  title: '前端性能优化全攻略',                category: 'perf',    status: 'published', author: '张伟', authorId: 5, views: 4201, createTime: '2024-05-10 09:30:00', updateTime: '2024-05-12 10:00:00', summary: '懒加载、CDN、Gzip、splitChunks、图片优化' },
  { id: 8,  title: 'TypeScript + Vue 2 最佳实践',       category: 'tech',    status: 'review',    author: '张三', authorId: 2, views: 0,    createTime: '2024-05-20 14:00:00', updateTime: '2024-05-20 14:00:00', summary: '在 Vue 2 项目中引入 TypeScript，提升代码质量' }
]

// ─── 仪表盘统计数据 ───────────────────────────────────
export const MOCK_STATS = {
  totalUsers:    6,
  newUsersToday: 2,
  totalArticles: 8,
  publishedArticles: 5,
  totalViews:    12253,
  todayViews:    342
}

// 折线图数据（最近7天访问量）
export const MOCK_CHART_DATA = {
  dates: ['03-26', '03-27', '03-28', '03-29', '03-30', '03-31', '04-01'],
  views: [218, 305, 427, 189, 356, 480, 342],
  users: [42,  58,  91,  35,  68,  102, 63]
}
