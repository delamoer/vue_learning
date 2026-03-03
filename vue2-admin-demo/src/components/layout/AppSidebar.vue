<template>
  <div class="sidebar" :class="{ collapsed: !sidebarOpened }">
    <!-- LOGO 区域 -->
    <div class="sidebar-logo">
      <span class="logo-icon">⚡</span>
      <transition name="logo-fade">
        <span v-if="sidebarOpened" class="logo-title">Vue Admin</span>
      </transition>
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-active="activeMenu"
      :collapse="!sidebarOpened"
      :collapse-transition="false"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      unique-opened
      router
    >
      <template v-for="route in menuRoutes">
        <!-- 多子路由：显示为子菜单组 -->
        <el-submenu
          v-if="hasVisibleChildren(route)"
          :key="route.path"
          :index="route.path"
        >
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span slot="title">{{ route.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="child in visibleChildren(route)"
            :key="child.path"
            :index="resolvePath(route.path, child.path)"
          >
            <i :class="child.meta && child.meta.icon"></i>
            <span>{{ child.meta && child.meta.title }}</span>
          </el-menu-item>
        </el-submenu>

        <!-- 单子路由：直接作为菜单项 -->
        <el-menu-item
          v-else-if="singleVisibleChild(route)"
          :key="route.path + '_single'"
          :index="resolvePath(route.path, singleVisibleChild(route).path)"
        >
          <i :class="route.meta && route.meta.icon || (singleVisibleChild(route).meta && singleVisibleChild(route).meta.icon)"></i>
          <span slot="title">{{ singleVisibleChild(route).meta && singleVisibleChild(route).meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { asyncRoutes } from '@/router/routes'

export default {
  name: 'AppSidebar',
  computed: {
    ...mapGetters('app', ['sidebarOpened']),
    activeMenu() {
      return this.$route.path
    },
    // 过滤掉 hidden:true 的顶级路由
    menuRoutes() {
      return asyncRoutes.filter(r => r.path !== '*' && !r.meta?.hidden)
    }
  },
  methods: {
    // 获取非隐藏的子路由
    visibleChildren(route) {
      return (route.children || []).filter(c => !c.meta?.hidden)
    },
    // 是否有 2+ 个可见子路由（需要展开组）
    hasVisibleChildren(route) {
      return this.visibleChildren(route).length >= 2
    },
    // 只有 1 个可见子路由时返回该子路由
    singleVisibleChild(route) {
      const visible = this.visibleChildren(route)
      return visible.length === 1 ? visible[0] : null
    },
    resolvePath(parentPath, childPath) {
      if (!childPath) return parentPath
      if (childPath.startsWith('/')) return childPath
      // 拼接父子路径
      return `/${[parentPath, childPath].join('/').replace(/\/+/g, '/').replace(/^\//, '')}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  background: $bg-sidebar;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.collapsed {
    .el-menu { border-right: none; }
  }
}

.sidebar-logo {
  @include flex-vcenter;
  height: $header-height;
  padding: 0 $spacing-md;
  background: $bg-sidebar-dark;
  overflow: hidden;

  .logo-icon {
    font-size: 20px;
    flex-shrink: 0;
  }

  .logo-title {
    font-size: $font-size-md;
    font-weight: 700;
    color: #fff;
    margin-left: $spacing-sm;
    white-space: nowrap;
  }
}

// el-menu 不超出
.el-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

// 菜单 icon 宽度统一
.el-menu-item i, .el-submenu__title i {
  margin-right: $spacing-xs;
  font-size: $font-size-md;
}

// 激活菜单高亮背景
::v-deep .el-menu-item.is-active {
  background-color: $menu-active-bg !important;
  border-right: 3px solid $primary;
}

// 动画
.logo-fade-enter-active, .logo-fade-leave-active { transition: opacity 0.2s; }
.logo-fade-enter, .logo-fade-leave-to { opacity: 0; }
</style>
