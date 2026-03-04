<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <div class="footer-links">
        <span>关于我们</span>
        <span>联系客服</span>
        <span>合作招募</span>
        <span>帮助中心</span>
        <span>销售规则</span>
      </div>
      <p class="footer-copy">© 2026 VueShop 电商平台 — Vue 2 综合实战项目</p>
    </div>
  </footer>
</template>

<script>
export default { name: 'AppFooter' }
</script>

<style lang="scss" scoped>
.app-footer {
  background: #2c2c2c;
  color: #888;
  padding: 20px 0;
  margin-top: 40px;
}
.footer-inner { text-align: center; }
.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 10px;
  span { font-size: 13px; cursor: pointer; &:hover { color: #ccc; } }
}
.footer-copy { font-size: 12px; }
</style>
