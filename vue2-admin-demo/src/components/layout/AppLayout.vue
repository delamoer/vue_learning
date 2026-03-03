<template>
  <div class="app-layout" :class="{ 'sidebar-collapsed': !sidebarOpened }">
    <!-- 侧边栏 -->
    <app-sidebar class="sidebar-container" />

    <!-- 右侧主区域 -->
    <div class="main-container">
      <!-- 顶部栏 -->
      <app-header />

      <!-- 多标签页 -->
      <app-tags-view />

      <!-- 内容区 -->
      <div class="app-main">
        <!-- keep-alive 缓存：只缓存 meta.keepAlive=true 的组件 -->
        <keep-alive :include="cachedViews">
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'
import AppTagsView from './AppTagsView'

export default {
  name: 'AppLayout',
  components: { AppSidebar, AppHeader, AppTagsView },
  computed: {
    ...mapGetters('app', ['sidebarOpened']),
    ...mapGetters('tagsView', ['cachedViews'])
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

// 侧边栏
.sidebar-container {
  width: $sidebar-width;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: width $transition-base;
  flex-shrink: 0;
}

// 右侧主区
.main-container {
  margin-left: $sidebar-width;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left $transition-base;
  overflow: hidden;
}

.app-main {
  flex: 1;
  padding: $spacing-md;
  background: $bg-page;
  overflow: auto;
}

// 折叠状态
.sidebar-collapsed {
  .sidebar-container { width: $sidebar-collapsed-width; }
  .main-container    { margin-left: $sidebar-collapsed-width; }
}

@include mobile {
  .sidebar-container {
    transform: translateX(-100%);
    &.show { transform: translateX(0); }
  }
  .main-container { margin-left: 0; }
}
</style>
