<template>
  <div class="user-detail-page">
    <div class="page-header mb-md">
      <el-button icon="el-icon-arrow-left" size="small" @click="$router.back()">返回</el-button>
      <span class="ml-md text-bold">用户详情</span>
    </div>

    <el-card v-loading="loading">
      <div v-if="user" class="user-profile">
        <!-- 头像区 -->
        <div class="avatar-section">
          <el-avatar :size="80" icon="el-icon-user-solid" :style="{ background: '#409EFF' }"></el-avatar>
          <div class="user-basic">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-username">@{{ user.username }}</div>
            <el-tag v-for="r in user.roles" :key="r" :type="roleTagType(r)" size="small" class="mr-sm">
              {{ roleLabel(r) }}
            </el-tag>
          </div>
        </div>

        <el-divider />

        <!-- 详细信息 -->
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户 ID">{{ user.id }}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
          <el-descriptions-item label="部门">{{ user.department || '-' }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-badge :type="user.status ? 'success' : 'danger'" style="display:inline-block">
              <el-tag :type="user.status ? 'success' : 'danger'" size="small">
                {{ user.status ? '正常' : '禁用' }}
              </el-tag>
            </el-badge>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ user.createTime }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <el-empty v-else-if="!loading" description="用户不存在" />
    </el-card>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { ROLE_LABEL, ROLE_TAG_TYPE } from '@/constants/roles'

export default {
  name: 'UserDetailView',
  data() {
    return { loading: false, user: null }
  },
  created() {
    this.loadUser()
  },
  methods: {
    async loadUser() {
      this.loading = true
      try {
        this.user = await getUserDetail(Number(this.$route.params.id))
      } catch {
        this.$message.error('用户不存在')
      } finally {
        this.loading = false
      }
    },
    roleLabel(r) { return ROLE_LABEL[r] || r },
    roleTagType(r) { return ROLE_TAG_TYPE[r] || 'info' }
  }
}
</script>

<style lang="scss" scoped>
.page-header { @include flex-vcenter; }

.user-profile {
  .avatar-section {
    @include flex-vcenter;
    gap: $spacing-lg;
    padding: $spacing-md 0;

    .user-name { font-size: $font-size-xl; font-weight: 700; color: $text-primary; }
    .user-username { font-size: $font-size-sm; color: $text-secondary; margin-bottom: $spacing-xs; }
  }
}
</style>
