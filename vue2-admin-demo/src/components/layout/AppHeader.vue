<template>
  <div class="app-header">
    <!-- 左侧：折叠按钮 + 面包屑 -->
    <div class="header-left">
      <i
        class="toggle-btn"
        :class="sidebarOpened ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggleSidebar"
      ></i>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, idx) in breadcrumbList"
          :key="item.path"
          :to="idx < breadcrumbList.length - 1 ? { path: item.path } : null"
        >
          {{ item.meta && item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 右侧：用户菜单 -->
    <div class="header-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="user-info">
          <el-avatar :size="32" icon="el-icon-user-solid" :style="{ background: '#409EFF' }"></el-avatar>
          <span class="user-name">{{ userName }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">
            <i class="el-icon-user"></i> 个人资料
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            <i class="el-icon-switch-button"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('app', ['sidebarOpened']),
    ...mapGetters('auth', ['userName']),
    // 根据当前路由的 matched 生成面包屑
    breadcrumbList() {
      return this.$route.matched.filter(r => r.meta && r.meta.title)
    }
  },
  methods: {
    ...mapActions('app', ['toggleSidebar']),
    async handleCommand(cmd) {
      if (cmd === 'profile') {
        this.$router.push('/profile')
      } else if (cmd === 'logout') {
        await this.$confirm('确定要退出登录吗？', '提示', { type: 'warning' })
        await this.$store.dispatch('auth/logout')
        this.$store.dispatch('tagsView/delAllViews')
        this.$router.push('/login')
        this.$message.success('已安全退出')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  @include flex-between;
  height: $header-height;
  background: $bg-white;
  padding: 0 $spacing-md;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: sticky;
  top: 0;
  z-index: 99;
}

.header-left {
  @include flex-vcenter;
  gap: $spacing-md;
}

.toggle-btn {
  font-size: 20px;
  cursor: pointer;
  color: $text-regular;
  padding: $spacing-xs;
  border-radius: $radius-base;
  transition: $transition-fast;

  &:hover {
    background: $border-extra-light;
    color: $primary;
  }
}

.breadcrumb {
  font-size: $font-size-sm;
}

.header-right {
  @include flex-vcenter;
}

.user-info {
  @include flex-vcenter;
  gap: $spacing-sm;
  cursor: pointer;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-md;
  transition: $transition-fast;

  &:hover { background: $border-extra-light; }

  .user-name {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text-regular;
  }

  .el-icon-arrow-down {
    font-size: $font-size-xs;
    color: $text-secondary;
  }
}
</style>
