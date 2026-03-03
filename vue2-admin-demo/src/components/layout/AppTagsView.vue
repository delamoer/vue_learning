<template>
  <div class="tags-view">
    <div class="tags-container" ref="scrollContainer">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="tag.fullPath"
        class="tag-item"
        :class="{ active: isActive(tag), affix: tag.affix }"
        @click.middle.native="!tag.affix && closeTag(tag)"
      >
        {{ tag.title }}
        <i
          v-if="!tag.affix"
          class="el-icon-close tag-close"
          @click.prevent.stop="closeTag(tag)"
        ></i>
      </router-link>
    </div>

    <!-- 右键操作按钮（简化版：清除其他） -->
    <el-dropdown class="tags-action" trigger="click" @command="handleAction">
      <i class="el-icon-arrow-down"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
        <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppTagsView',
  computed: {
    ...mapGetters('tagsView', ['visitedViews'])
  },
  watch: {
    $route(to) {
      if (!to.meta?.hidden) {
        this.$store.dispatch('tagsView/addView', to)
      }
    }
  },
  methods: {
    ...mapActions('tagsView', ['delView', 'delOtherViews', 'delAllViews']),
    isActive(tag) {
      return tag.path === this.$route.path
    },
    async closeTag(tag) {
      const { visitedViews } = await this.delView(tag)
      // 若关闭的是当前激活标签，跳到最后一个
      if (this.isActive(tag)) {
        const last = visitedViews[visitedViews.length - 1]
        if (last) this.$router.push(last.fullPath)
      }
    },
    async handleAction(cmd) {
      const current = this.$route
      if (cmd === 'closeOthers') {
        await this.delOtherViews(current)
      } else if (cmd === 'closeAll') {
        await this.delAllViews()
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view {
  @include flex-vcenter;
  height: $tags-view-height;
  background: $bg-white;
  border-bottom: 1px solid $border-light;
  padding: 0 $spacing-sm;
  gap: $spacing-xs;
}

.tags-container {
  @include flex-vcenter;
  flex: 1;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;

  // 隐藏滚动条但保留功能
  &::-webkit-scrollbar { height: 0; }
}

.tag-item {
  @include flex-vcenter;
  height: 24px;
  padding: 0 8px;
  font-size: $font-size-xs;
  color: $text-regular;
  background: $bg-white;
  border: 1px solid $border-base;
  border-radius: $radius-sm;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  gap: 4px;
  transition: $transition-fast;

  &:hover {
    color: $primary;
    border-color: $primary;
  }

  &.active {
    color: $bg-white;
    background: $primary;
    border-color: $primary;
  }

  &.affix {
    padding-right: 8px;
  }
}

.tag-close {
  font-size: 10px;
  border-radius: 50%;
  padding: 1px;
  transition: $transition-fast;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.tags-action {
  flex-shrink: 0;
  padding: 0 8px;
  cursor: pointer;
  color: $text-secondary;

  &:hover { color: $primary; }
}
</style>
