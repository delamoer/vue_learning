<template>
  <div class="error-page">
    <div class="error-code">404</div>
    <div class="error-title">页面不存在</div>
    <div class="error-desc">您访问的页面已被删除或从未存在</div>
    <div class="mt-lg">
      <el-button type="primary" icon="el-icon-s-home" @click="$router.replace('/dashboard')">返回首页</el-button>
      <el-button icon="el-icon-arrow-left" class="ml-sm" @click="$router.back()">返回上页</el-button>
    </div>
  </div>
</template>

<script>
export default { name: 'ErrorView404' }
</script>

<style lang="scss" scoped>
.error-page {
  @include flex-center;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  text-align: center;

  .error-code {
    font-size: 120px;
    font-weight: 700;
    color: $danger;
    line-height: 1;
    text-shadow: 4px 4px 0 rgba($danger, 0.2);
  }

  .error-title {
    font-size: $font-size-xxl;
    font-weight: 600;
    color: $text-primary;
    margin: $spacing-md 0 $spacing-sm;
  }

  .error-desc { color: $text-secondary; }
}
</style>
