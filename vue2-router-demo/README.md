# vue2-router-demo

Vue 2 + Vue Router 3 学习演示项目。

## 运行步骤

```bash
# 1. 进入项目目录
cd vue2-router-demo

# 2. 安装依赖（首次运行）
npm install

# 3. 启动开发服务器
npm run serve
```

浏览器访问 `http://localhost:8080`

## 演示功能

| 功能 | 位置 |
|------|------|
| 基本路由配置 | `src/router/index.js` |
| 懒加载路由 | `src/router/index.js`（动态 import） |
| 动态路由参数 `:id` + props 解耦 | `/articles/:id` → `ArticleDetail.vue` |
| 声明式导航 `<router-link>` | `NavBar.vue`、`ArticleList.vue` |
| 编程式导航 `$router.push/replace/back` | `HomeView.vue`、`ArticleDetail.vue` |
| Query 参数同步到 URL | `ArticleList.vue`（搜索框） |
| 路由 meta 信息 | `router/index.js` |
| 全局前置守卫（设置页面标题） | `router/index.js` - `beforeEach` |
| 组件内守卫 `beforeRouteUpdate` | `ArticleDetail.vue` |
| 404 catch-all | `router/index.js` - `path: '*'` |
| History 模式（无 # 号） | `router/index.js` - `mode: 'history'` |

## 项目结构

```
src/
├── main.js               ← Vue 实例，挂载 router
├── App.vue               ← 根组件，含顶部导航和 <router-view>
├── router/
│   └── index.js          ← 路由配置 + 全局守卫
├── views/                ← 页面级组件
│   ├── HomeView.vue      ← 首页（含编程式导航示例）
│   ├── ArticleList.vue   ← 文章列表（搜索 + 声明式导航）
│   ├── ArticleDetail.vue ← 文章详情（props接收id + 上下篇导航）
│   ├── AboutView.vue     ← 关于页面
│   └── NotFound.vue      ← 404 页面
└── components/
    └── NavBar.vue        ← 顶部导航栏，含 router-link
```
