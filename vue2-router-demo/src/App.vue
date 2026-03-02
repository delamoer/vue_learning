<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <!-- 路由出口：根据当前路由渲染对应的视图组件 -->
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar }
}
</script>

<style>
/* 全局样式重置 */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #0f172a;
  --card: #1e293b;
  --border: #334155;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --accent: #60a5fa;
  --green: #34d399;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', 'PingFang SC', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
