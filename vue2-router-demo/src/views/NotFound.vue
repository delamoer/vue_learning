<template>
  <div class="not-found">
    <div class="code">404</div>
    <h1>页面不存在</h1>
    <p>您访问的路径 <code>{{ $route.path }}</code> 不存在。</p>
    <div class="actions">
      <router-link to="/home" class="btn">回到首页</router-link>
      <button class="btn btn-ghost" @click="$router.back()">返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}

.code {
  font-size: 5rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 12px;
  letter-spacing: -4px;
}

h1 {
  font-size: 1.5rem;
  color: #e2e8f0;
  margin-bottom: 10px;
}

p {
  color: #94a3b8;
  margin-bottom: 24px;
}

code {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  padding: 1px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 9px 20px;
  background: #3b82f6;
  color: #fff;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover {
  background: #2563eb;
  text-decoration: none;
  color: #fff;
}

.btn-ghost {
  background: transparent;
  color: #94a3b8;
  border: 1px solid #334155;
}

.btn-ghost:hover {
  background: #1e293b;
  color: #e2e8f0;
}
</style>
