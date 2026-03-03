<template>
  <div class="profile-page">
    <el-row :gutter="20">
      <!-- 左侧：头像 + 基本信息 -->
      <el-col :xs="24" :sm="8">
        <el-card class="avatar-card text-center">
          <el-avatar :size="80" icon="el-icon-user" class="mb-md" />
          <div class="fs-lg fw-bold">{{ userInfo.name }}</div>
          <el-tag :type="roleTagType" size="small" class="mt-sm">{{ roleLabel }}</el-tag>
          <div class="mt-md text-secondary fs-sm">{{ userInfo.email }}</div>
        </el-card>
      </el-col>

      <!-- 右侧：详情 + 修改密码 -->
      <el-col :xs="24" :sm="16">
        <el-card header="个人资料" class="mb-md">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ userInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
            <el-descriptions-item label="角色">{{ roleLabel }}</el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag type="success" size="small">正常</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ userInfo.createTime || '-' }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card header="修改密码">
          <el-form ref="pwdForm" :model="pwdForm" :rules="pwdRules" label-width="100px" style="max-width:420px">
            <el-form-item label="原密码" prop="oldPwd">
              <el-input v-model="pwdForm.oldPwd" type="password" show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input v-model="pwdForm.newPwd" type="password" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input v-model="pwdForm.confirmPwd" type="password" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="submitting" @click="changePwd">保存修改</el-button>
              <el-button @click="resetPwdForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ROLES, ROLE_LABEL, ROLE_TAG_TYPE } from '@/constants/roles'

export default {
  name: 'ProfileView',
  data() {
    const validateConfirm = (rule, value, cb) => {
      if (value !== this.pwdForm.newPwd) cb(new Error('两次密码不一致'))
      else cb()
    }
    return {
      ROLES,
      submitting: false,
      pwdForm: { oldPwd: '', newPwd: '', confirmPwd: '' },
      pwdRules: {
        oldPwd: [{ required: true, message: '请输入原密码' }],
        newPwd: [{ required: true, message: '请输入新密码' }, { min: 6, message: '至少6位' }],
        confirmPwd: [{ required: true, message: '请确认密码' }, { validator: validateConfirm }]
      }
    }
  },
  computed: {
    ...mapGetters({ userInfo: 'auth/userInfo', roles: 'auth/roles' }),
    roleLabel() { return ROLE_LABEL[this.roles[0]] || this.roles[0] },
    roleTagType() { return ROLE_TAG_TYPE[this.roles[0]] || 'info' }
  },
  methods: {
    changePwd() {
      this.$refs.pwdForm.validate(valid => {
        if (!valid) return
        this.submitting = true
        setTimeout(() => {
          this.submitting = false
          this.$message.success('密码修改成功（演示模式，未实际修改）')
          this.resetPwdForm()
        }, 800)
      })
    },
    resetPwdForm() { this.$refs.pwdForm.resetFields() }
  }
}
</script>

<style lang="scss" scoped>
.avatar-card { padding: $spacing-lg 0; }
</style>
