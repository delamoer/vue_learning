<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="logo">
        <span class="logo-icon">⚙️</span>
        <span class="logo-text">Vue CLI Demo</span>
        <!-- 环境标签 -->
        <span class="env-badge" :style="{ background: envColor }">
          {{ envLabel }}
        </span>
      </div>

      <nav class="nav">
        <router-link to="/home" class="nav-item">🏠 首页</router-link>
        <router-link to="/env" class="nav-item">🔑 环境变量</router-link>
        <router-link to="/style" class="nav-item">🎨 样式系统</router-link>
        <router-link to="/perf" class="nav-item">🚀 性能优化</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    envLabel() {
      return process.env.VUE_APP_ENV_LABEL || 'Unknown'
    },
    envColor() {
      return process.env.VUE_APP_ENV_COLOR || '#666'
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background: $bg-card;
  border-bottom: 1px solid $border-color;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: $shadow-sm;

  .header-inner {
    max-width: $content-max-width;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    height: $header-height;
    @include flex-vcenter;
    justify-content: space-between;
  }
}

.logo {
  @include flex-vcenter;
  gap: $spacing-sm;

  .logo-icon { font-size: $font-size-xl; }
  .logo-text  { font-size: $font-size-lg; font-weight: 700; color: $primary; }

  .env-badge {
    padding: 2px 10px;
    border-radius: 12px;
    font-size: $font-size-xs;
    font-weight: 600;
    color: #000;
    opacity: 0.9;
  }
}

.nav {
  @include flex-vcenter;
  gap: $spacing-sm;

  @include mobile {
    display: none;
  }
}

.nav-item {
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: $text-muted;
  transition: $transition-fast;
  white-space: nowrap;

  &:hover {
    color: $primary;
    background: rgba($primary, 0.1);
    text-decoration: none;
  }

  &.router-link-active {
    color: $primary;
    background: rgba($primary, 0.12);
    font-weight: 600;
  }
}
</style>
