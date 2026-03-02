<template>
  <div class="article-list">
    <div class="page-header">
      <h1>文章列表</h1>
      <p class="subtitle">点击文章标题查看详情（演示动态路由 + params）</p>
    </div>

    <!-- 搜索框（演示 query 参数） -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="输入关键词搜索..."
        @input="updateQuery"
      />
      <button v-if="searchQuery" class="clear-btn" @click="clearSearch">✕ 清除</button>
    </div>

    <!-- 文章列表 -->
    <div class="articles">
      <div
        class="article-card"
        v-for="article in filteredArticles"
        :key="article.id"
        @click="goToDetail(article.id)"
      >
        <div class="article-meta">
          <span class="article-id">#{{ article.id }}</span>
          <span class="article-tag" :class="'tag-' + article.category">{{ article.category }}</span>
        </div>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-summary">{{ article.summary }}</p>
        <div class="article-footer">
          <span class="article-date">{{ article.date }}</span>
          <!-- 声明式导航：router-link -->
          <router-link
            :to="{ name: 'article-detail', params: { id: String(article.id) } }"
            class="read-btn"
          >
            阅读全文 →
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="filteredArticles.length === 0" class="empty-tip">
      没有找到匹配的文章。
      <button class="link-btn" @click="clearSearch">清除搜索</button>
    </div>
  </div>
</template>

<script>
const ALL_ARTICLES = [
  {
    id: 1,
    title: 'Vue Router 基本配置',
    summary: '介绍如何在 Vue 2 项目中安装和配置 Vue Router，包括路由表的定义和 createRouter 的使用。',
    category: 'vue',
    date: '2024-01-10'
  },
  {
    id: 2,
    title: '动态路由与路由参数',
    summary: '深入讲解动态路由段（:id）、query 查询参数、以及 props 解耦三种模式的使用方法。',
    category: 'vue',
    date: '2024-01-15'
  },
  {
    id: 3,
    title: '嵌套路由实战',
    summary: '通过用户中心案例，演示 children 嵌套路由配置、默认子路由和多个 router-view 的用法。',
    category: 'vue',
    date: '2024-01-20'
  },
  {
    id: 4,
    title: '编程式导航详解',
    summary: '通过 $router.push 和 replace 方法实现代码驱动的路由跳转，以及重复导航的错误处理方案。',
    category: 'vue',
    date: '2024-01-25'
  },
  {
    id: 5,
    title: '路由守卫与权限控制',
    summary: '使用 beforeEach 全局守卫、路由独享守卫和组件内守卫实现登录鉴权和页面访问控制。',
    category: 'vue',
    date: '2024-01-30'
  },
  {
    id: 6,
    title: 'Hash 与 History 模式',
    summary: '深入对比两种路由模式的原理差异、适用场景，以及 History 模式在 Nginx 和 Node.js 下的服务器配置。',
    category: 'vue',
    date: '2024-02-05'
  }
]

export default {
  name: 'ArticleList',

  data() {
    return {
      articles: ALL_ARTICLES,
      searchQuery: ''
    }
  },

  computed: {
    filteredArticles() {
      const kw = this.searchQuery.trim().toLowerCase()
      if (!kw) return this.articles
      return this.articles.filter(a =>
        a.title.toLowerCase().includes(kw) ||
        a.summary.toLowerCase().includes(kw)
      )
    }
  },

  created() {
    // 如果 URL 中有 search 参数，初始化搜索框
    const kw = this.$route.query.search
    if (kw) this.searchQuery = kw
  },

  watch: {
    // 监听路由 query 变化（比如通过编程式导航带的参数）
    '$route.query.search'(newVal) {
      this.searchQuery = newVal || ''
    }
  },

  methods: {
    // 编程式导航跳转详情
    goToDetail(id) {
      this.$router.push({ name: 'article-detail', params: { id: String(id) } })
    },

    // 更新 URL query 参数（搜索时同步到 URL）
    updateQuery() {
      const query = this.searchQuery ? { search: this.searchQuery } : {}
      // replace 不留历史记录，不然每个搜索字符都会入栈
      this.$router.replace({ path: '/articles', query }).catch(() => {})
    },

    clearSearch() {
      this.searchQuery = ''
      this.$router.replace({ path: '/articles' }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.article-list {}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 1.5rem;
  color: #e2e8f0;
  margin-bottom: 6px;
}

.subtitle {
  color: #94a3b8;
  font-size: 0.88rem;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.search-bar input {
  flex: 1;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 9px 14px;
  color: #e2e8f0;
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.15s;
}

.search-bar input:focus {
  border-color: #3b82f6;
}

.search-bar input::placeholder {
  color: #475569;
}

.clear-btn {
  background: none;
  border: 1px solid #334155;
  color: #94a3b8;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
}

.clear-btn:hover {
  color: #e2e8f0;
  background: #334155;
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.article-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.15s;
}

.article-card:hover {
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.article-id {
  font-size: 0.78rem;
  color: #475569;
  font-family: monospace;
}

.article-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tag-vue {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

.article-title {
  color: #e2e8f0;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.article-summary {
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 14px;
}

.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.article-date {
  font-size: 0.78rem;
  color: #475569;
}

.read-btn {
  font-size: 0.82rem;
  color: #3b82f6;
  text-decoration: none;
}

.read-btn:hover {
  text-decoration: underline;
}

.empty-tip {
  text-align: center;
  color: #475569;
  padding: 40px;
  font-size: 0.9rem;
}

.link-btn {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0 4px;
}
</style>
