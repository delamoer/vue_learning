<template>
  <div class="error-page">
    <div class="error-code">403</div>
    <div class="error-title">无权限访问</div>
    <div class="error-desc">抱歉，您没有权限访问该页面</div>
    <div class="mt-lg">
      <el-button type="primary" icon="el-icon-s-home" @click="$router.replace('/dashboard')">返回首页</el-button>
      <el-button icon="el-icon-arrow-left" class="ml-sm" @click="$router.back()">返回上页</el-button>
    </div>
  </div>
</template>

<script>
export default { name: 'ErrorView403' }
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
    color: $warning;
    line-height: 1;
    text-shadow: 4px 4px 0 rgba($warning, 0.2);
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
