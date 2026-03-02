<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <span class="logo">📚 Router Demo</span>
      <ul class="nav-links">
        <!-- router-link 会自动添加 active class -->
        <li>
          <router-link to="/home">首页</router-link>
        </li>
        <li>
          <router-link to="/articles">文章列表</router-link>
        </li>
        <li>
          <router-link to="/about">关于</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  background: #1e293b;
  border-bottom: 1px solid #334155;
  padding: 0 20px;
}

.navbar-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.logo {
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 8px;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.88rem;
  transition: all 0.15s;
}

.nav-links a:hover {
  background: rgba(96, 165, 250, 0.1);
  color: #e2e8f0;
  text-decoration: none;
}

/* router-link-active：路径前缀匹配 */
/* router-link-exact-active：精确匹配 */
.nav-links a.router-link-active {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
}
</style>
