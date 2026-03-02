<template>
  <div class="article-detail">
    <!-- 未找到文章 -->
    <div v-if="!article" class="not-found">
      <div class="not-found-icon">🔍</div>
      <h2>文章不存在</h2>
      <p>ID 为 <strong>{{ id }}</strong> 的文章未找到。</p>
      <button class="btn" @click="$router.push('/articles')">返回文章列表</button>
    </div>

    <!-- 文章详情 -->
    <div v-else>
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/home">首页</router-link>
        <span class="sep">›</span>
        <router-link to="/articles">文章列表</router-link>
        <span class="sep">›</span>
        <span class="current">{{ article.title }}</span>
      </div>

      <!-- 文章头部 -->
      <div class="article-header">
        <div class="article-meta">
          <span class="article-id">文章 #{{ article.id }}</span>
          <span class="tag tag-vue">{{ article.category }}</span>
          <span class="date">{{ article.date }}</span>
        </div>
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-summary">{{ article.summary }}</p>
      </div>

      <!-- 文章正文（模拟） -->
      <div class="article-body">
        <div class="content-block" v-for="block in article.content" :key="block.heading">
          <h2>{{ block.heading }}</h2>
          <p>{{ block.text }}</p>
          <div class="code-sample" v-if="block.code">{{ block.code }}</div>
        </div>
      </div>

      <!-- 底部导航：上一篇 / 下一篇 -->
      <div class="article-nav">
        <button
          class="nav-btn"
          :disabled="!prevArticle"
          @click="prevArticle && $router.push({ name: 'article-detail', params: { id: String(prevArticle.id) } })"
        >
          ← {{ prevArticle ? prevArticle.title : '没有上一篇' }}
        </button>
        <button
          class="nav-btn"
          :disabled="!nextArticle"
          @click="nextArticle && $router.push({ name: 'article-detail', params: { id: String(nextArticle.id) } })"
        >
          {{ nextArticle ? nextArticle.title : '没有下一篇' }} →
        </button>
      </div>

      <!-- 返回列表 -->
      <div class="back-area">
        <button class="btn" @click="$router.back()">← 返回上一页</button>
        <router-link to="/articles" class="btn btn-secondary">文章列表</router-link>
      </div>
    </div>
  </div>
</template>

<script>
const ARTICLES = [
  {
    id: 1,
    title: 'Vue Router 基本配置',
    summary: '介绍如何在 Vue 2 项目中安装和配置 Vue Router，包括路由表的定义和 createRouter 的使用。',
    category: 'vue',
    date: '2024-01-10',
    content: [
      {
        heading: '安装 Vue Router',
        text: '通过 npm install vue-router@3 安装适用于 Vue 2 的路由库，或通过 CDN 引入 vue-router.js 文件。',
        code: 'npm install vue-router@3'
      },
      {
        heading: '配置路由表',
        text: '创建 router/index.js 文件，定义路由数组，每个路由对象包含 path、component 和可选的 name、meta 等属性。',
        code: "const routes = [\n  { path: '/home', component: Home },\n  { path: '*', redirect: '/' }\n]"
      },
      {
        heading: '创建路由器实例',
        text: '使用 new VueRouter({ routes }) 创建路由器，传入 Vue 实例的 router 选项，即可在所有组件中使用 $route 和 $router。',
        code: null
      }
    ]
  },
  {
    id: 2,
    title: '动态路由与路由参数',
    summary: '深入讲解动态路由段（:id）、query 查询参数、以及 props 解耦三种模式的使用方法。',
    category: 'vue',
    date: '2024-01-15',
    content: [
      {
        heading: '动态路由段',
        text: '在路由路径中使用冒号前缀定义动态参数，如 /user/:id。匹配到这个路由时，:id 的值会存放在 $route.params.id 中。',
        code: "{ path: '/user/:id', component: UserDetail }"
      },
      {
        heading: 'Query 查询参数',
        text: 'Query 参数附加在 URL 的 ? 后面，如 /search?kw=vue&page=1。通过 $route.query.kw 访问。适合可选参数和分页查询。',
        code: null
      },
      {
        heading: 'Props 解耦',
        text: '将 props: true 添加到路由配置，路由参数会自动作为 props 传给组件，使组件不依赖 $route，更易测试和复用。',
        code: "{ path: '/user/:id', component: UserDetail, props: true }"
      }
    ]
  },
  {
    id: 3,
    title: '嵌套路由实战',
    summary: '通过用户中心案例，演示 children 嵌套路由配置、默认子路由和多个 router-view 的用法。',
    category: 'vue',
    date: '2024-01-20',
    content: [
      {
        heading: 'children 配置',
        text: '在路由对象上添加 children 数组可以配置子路由。子路由的 path 不加 / 前缀，渲染到父组件内的 <router-view> 中。',
        code: "{ path: '/user', component: User, children: [\n  { path: 'profile', component: UserProfile },\n  { path: '', redirect: 'profile' }\n]}"
      },
      {
        heading: '默认子路由',
        text: '在父路由下添加 path 为空字符串的子路由，或使用 redirect 将父路径重定向到默认子路由，实现访问父路径时自动展示默认内容。',
        code: null
      }
    ]
  },
  {
    id: 4,
    title: '编程式导航详解',
    summary: '通过 $router.push 和 replace 方法实现代码驱动的路由跳转，以及重复导航的错误处理方案。',
    category: 'vue',
    date: '2024-01-25',
    content: [
      {
        heading: 'push 与 replace',
        text: 'this.$router.push() 向历史栈推入新记录，用户可以后退；this.$router.replace() 替换当前记录，不可后退。登录后的跳转推荐使用 replace。',
        code: "this.$router.push({ name: 'home' })\nthis.$router.replace('/login')"
      },
      {
        heading: 'go / back / forward',
        text: 'this.$router.go(-1) 等同于浏览器后退；go(1) 等同于前进；back() 和 forward() 是语义化简写。返回上一页按钮通常用 $router.back()。',
        code: null
      }
    ]
  },
  {
    id: 5,
    title: '路由守卫与权限控制',
    summary: '使用 beforeEach 全局守卫、路由独享守卫和组件内守卫实现登录鉴权和页面访问控制。',
    category: 'vue',
    date: '2024-01-30',
    content: [
      {
        heading: '全局前置守卫',
        text: 'router.beforeEach((to, from, next) => {...}) 在每次路由跳转前触发。必须调用 next() 才能继续导航，否则页面会卡住。',
        code: "router.beforeEach((to, from, next) => {\n  if (to.meta.requiresAuth && !isLoggedIn) {\n    next('/login')\n  } else {\n    next()\n  }\n})"
      },
      {
        heading: 'meta 路由元信息',
        text: '在路由配置中添加 meta 对象，可以存放自定义信息，如 requiresAuth、title 等。在守卫中通过 to.meta 读取，实现灵活的权限控制。',
        code: null
      }
    ]
  },
  {
    id: 6,
    title: 'Hash 与 History 模式',
    summary: '深入对比两种路由模式的原理差异、适用场景，以及 History 模式在 Nginx 和 Node.js 下的服务器配置。',
    category: 'vue',
    date: '2024-02-05',
    content: [
      {
        heading: 'Hash 模式',
        text: 'URL 中包含 # 符号，# 后的内容不会发送给服务器，通过监听 hashchange 事件实现路由切换。优点是不需要服务器配置，兼容性最好。',
        code: "const router = new VueRouter({ mode: 'hash', routes })"
      },
      {
        heading: 'History 模式',
        text: '利用 HTML5 History API（pushState/replaceState）改变 URL，无 # 符号，URL 更美观。缺点是需要服务器配置 fallback 到 index.html，否则刷新会 404。',
        code: "const router = new VueRouter({ mode: 'history', routes })"
      }
    ]
  }
]

export default {
  name: 'ArticleDetail',

  // 通过 props: true 接收路由参数，而非直接读 $route.params
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    article() {
      return ARTICLES.find(a => String(a.id) === this.id) || null
    },
    prevArticle() {
      if (!this.article) return null
      const idx = ARTICLES.findIndex(a => a.id === this.article.id)
      return idx > 0 ? ARTICLES[idx - 1] : null
    },
    nextArticle() {
      if (!this.article) return null
      const idx = ARTICLES.findIndex(a => a.id === this.article.id)
      return idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null
    }
  },

  // 组件内守卫：同一路由 id 参数变化时刷新（组件被复用时）
  beforeRouteUpdate(to, from, next) {
    // 此时 props 还没更新，但 to.params.id 已经有新值
    // 不需要额外操作，因为 computed 依赖 props.id 会自动重计算
    next()
  }
}
</script>

<style scoped>
.article-detail {}

.breadcrumb {
  font-size: 0.8rem;
  color: #475569;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.breadcrumb a {
  color: #60a5fa;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.sep {
  color: #334155;
}

.current {
  color: #94a3b8;
}

.article-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #334155;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.article-id {
  font-size: 0.78rem;
  color: #475569;
  font-family: monospace;
}

.tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  text-transform: uppercase;
}

.tag-vue {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

.date {
  font-size: 0.78rem;
  color: #475569;
}

.article-title {
  font-size: 1.5rem;
  color: #e2e8f0;
  margin-bottom: 10px;
  line-height: 1.4;
}

.article-summary {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.7;
}

.article-body {
  margin-bottom: 40px;
}

.content-block {
  margin-bottom: 28px;
}

.content-block h2 {
  font-size: 1rem;
  color: #e2e8f0;
  margin-bottom: 8px;
  padding-left: 12px;
  border-left: 3px solid #3b82f6;
}

.content-block p {
  color: #94a3b8;
  font-size: 0.88rem;
  line-height: 1.75;
  margin-bottom: 10px;
}

.code-sample {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: 'Consolas', monospace;
  font-size: 0.8rem;
  color: #a5d6ff;
  white-space: pre;
  overflow-x: auto;
}

.article-nav {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.nav-btn {
  flex: 1;
  min-width: 180px;
  padding: 12px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 0.82rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-btn:not(:disabled):hover {
  border-color: #3b82f6;
  color: #e2e8f0;
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.back-area {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.15s;
}

.btn:hover {
  color: #e2e8f0;
  background: #334155;
  text-decoration: none;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.not-found h2 {
  color: #e2e8f0;
  margin-bottom: 8px;
}

.not-found p {
  color: #94a3b8;
  margin-bottom: 20px;
}

.not-found strong {
  color: #e2e8f0;
  font-family: monospace;
}
</style>
