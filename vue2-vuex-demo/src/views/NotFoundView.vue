<!-- views/NotFoundView.vue -->
<template>
  <div class="not-found">
    <div class="code">404</div>
    <div class="title">页面不存在</div>
    <router-link to="/home" class="btn btn-primary">返回首页</router-link>
  </div>
</template>

<script>
export default { name: 'NotFoundView' }
</script>

<style scoped>
.not-found { text-align: center; padding: 80px 20px; }
.code  { font-size: 5rem; font-weight: 900; color: #e2e8f0; line-height: 1; }
.title { font-size: 1.2rem; color: #94a3b8; margin: 12px 0 28px; }
</style>
