<template>
  <div class="home-view">
    <div class="hero">
      <h1>Vue Router 3 演示项目</h1>
      <p class="lead">本项目演示 Vue Router 的核心功能：动态路由、编程式导航、路由守卫、Hash / History 模式。</p>
      <div class="actions">
        <router-link to="/articles" class="btn btn-primary">浏览文章列表 →</router-link>
        <router-link to="/about" class="btn btn-secondary">了解更多</router-link>
      </div>
    </div>

    <div class="features">
      <div class="feature-card" v-for="feature in features" :key="feature.title">
        <div class="feature-icon">{{ feature.icon }}</div>
        <div class="feature-title">{{ feature.title }}</div>
        <div class="feature-desc">{{ feature.desc }}</div>
      </div>
    </div>

    <!-- 演示编程式导航 -->
    <div class="demo-section">
      <h2>编程式导航示例</h2>
      <p>用 <code>$router.push()</code> 跳转到指定文章：</p>
      <div class="demo-btns">
        <button class="btn btn-sm" @click="goToArticle(1)">跳转到文章 #1</button>
        <button class="btn btn-sm" @click="goToArticle(3)">跳转到文章 #3</button>
        <button class="btn btn-sm" @click="goToSearch">搜索"Vue"</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  data() {
    return {
      features: [
        {
          icon: '🔗',
          title: '声明式导航',
          desc: '使用 <router-link> 组件创建导航链接，自动处理 active class。'
        },
        {
          icon: '⚡',
          title: '编程式导航',
          desc: '在 JavaScript 中使用 $router.push / replace / go 进行路由跳转。'
        },
        {
          icon: '🛡️',
          title: '路由守卫',
          desc: '使用 beforeEach 等钩子实现权限验证、页面标题设置等。'
        },
        {
          icon: '📦',
          title: '懒加载',
          desc: '使用动态 import() 语法实现路由组件按需加载，优化首屏速度。'
        }
      ]
    }
  },

  methods: {
    // 编程式导航：push 对象写法（推荐）
    goToArticle(id) {
      this.$router.push({
        name: 'article-detail',
        params: { id: String(id) }
      })
    },

    goToSearch() {
      // 带 query 参数跳转
      this.$router.push({
        path: '/articles',
        query: { search: 'Vue' }
      })
    }
  }
}
</script>

<style scoped>
.home-view {}

.hero {
  padding: 40px 0 32px;
  border-bottom: 1px solid #334155;
  margin-bottom: 32px;
}

.hero h1 {
  font-size: 1.8rem;
  color: #e2e8f0;
  margin-bottom: 12px;
}

.lead {
  color: #94a3b8;
  font-size: 1rem;
  margin-bottom: 24px;
  max-width: 600px;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.15s;
}

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover {
  background: #2563eb;
  text-decoration: none;
  color: #fff;
}

.btn-secondary {
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
}

.btn-secondary:hover {
  color: #e2e8f0;
  text-decoration: none;
}

.btn-sm {
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
  padding: 7px 14px;
  font-size: 0.82rem;
}

.btn-sm:hover {
  color: #e2e8f0;
  background: #334155;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

.feature-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 18px;
}

.feature-icon {
  font-size: 1.4rem;
  margin-bottom: 8px;
}

.feature-title {
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 6px;
  font-size: 0.9rem;
}

.feature-desc {
  color: #94a3b8;
  font-size: 0.82rem;
  line-height: 1.6;
}

.demo-section {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 20px 22px;
}

.demo-section h2 {
  color: #e2e8f0;
  font-size: 1rem;
  margin-bottom: 8px;
}

.demo-section p {
  color: #94a3b8;
  font-size: 0.85rem;
  margin-bottom: 14px;
}

code {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  padding: 1px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85em;
}

.demo-btns {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
