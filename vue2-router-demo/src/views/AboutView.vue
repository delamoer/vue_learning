<template>
  <div class="about-view">
    <h1>关于本项目</h1>
    <p class="lead">这是一个 Vue 2 + Vue Router 3 的学习演示项目，用于掌握路由核心功能。</p>

    <div class="info-card">
      <h2>技术栈</h2>
      <ul>
        <li><span class="label">框架</span>Vue 2.7</li>
        <li><span class="label">路由</span>Vue Router 3.x</li>
        <li><span class="label">构建工具</span>Vue CLI 5</li>
        <li><span class="label">路由模式</span>History（无 # 号）</li>
      </ul>
    </div>

    <div class="info-card">
      <h2>演示的功能点</h2>
      <ul>
        <li>✅ 基本路由配置（router/index.js）</li>
        <li>✅ 动态路由参数（:id + props: true）</li>
        <li>✅ 声明式导航（&lt;router-link&gt;）</li>
        <li>✅ 编程式导航（push / replace / back）</li>
        <li>✅ Query 参数（搜索同步到 URL）</li>
        <li>✅ 路由懒加载（动态 import）</li>
        <li>✅ 路由 meta 信息（title）</li>
        <li>✅ 全局前置守卫（自动设置页面标题）</li>
        <li>✅ 组件内守卫（beforeRouteUpdate）</li>
        <li>✅ 404 catch-all 路由</li>
      </ul>
    </div>

    <div class="info-card">
      <h2>项目结构</h2>
      <div class="tree">
src/
├── main.js          ← Vue 实例，挂载 router
├── App.vue          ← 根组件，含顶部导航和 router-view
├── router/
│   └── index.js     ← 路由配置，懒加载，全局守卫
├── views/           ← 页面级组件
│   ├── HomeView.vue
│   ├── ArticleList.vue
│   ├── ArticleDetail.vue
│   ├── AboutView.vue
│   └── NotFound.vue
└── components/
    └── NavBar.vue   ← 导航栏，含 router-link</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-view {}

h1 {
  font-size: 1.5rem;
  color: #e2e8f0;
  margin-bottom: 10px;
}

.lead {
  color: #94a3b8;
  margin-bottom: 28px;
}

.info-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 20px 22px;
  margin-bottom: 18px;
}

.info-card h2 {
  font-size: 0.95rem;
  color: #e2e8f0;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #334155;
}

.info-card ul {
  list-style: none;
  padding: 0;
}

.info-card li {
  color: #94a3b8;
  padding: 5px 0;
  font-size: 0.88rem;
}

.label {
  display: inline-block;
  width: 80px;
  color: #60a5fa;
  font-weight: 600;
  font-size: 0.82rem;
}

.tree {
  font-family: 'Consolas', monospace;
  font-size: 0.8rem;
  color: #a5d6ff;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 14px 16px;
  white-space: pre;
  overflow-x: auto;
  line-height: 1.8;
}
</style>
