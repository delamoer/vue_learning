<template>
  <div class="not-found">
    <div class="error-code">404</div>
    <div class="error-msg">页面不见了</div>
    <div class="error-sub">你访问的路由不存在，请检查 URL 是否正确</div>
    <button class="btn btn-primary mt-md" @click="$router.push('/home')">
      ← 返回首页
    </button>
  </div>
</template>

<script>
export default { name: 'NotFoundView' }
</script>

<style lang="scss" scoped>
.not-found {
  @include flex-center;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  text-align: center;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  color: $primary;
  line-height: 1;
  opacity: 0.8;
  letter-spacing: -4px;
}

.error-msg {
  font-size: $font-size-xxl;
  color: $text-base;
  margin-top: $spacing-sm;
  font-weight: 700;
}

.error-sub {
  color: $text-muted;
  font-size: $font-size-md;
  margin-top: $spacing-xs;
}
</style>
