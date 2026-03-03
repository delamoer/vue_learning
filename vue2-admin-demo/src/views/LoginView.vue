<template>
  <div class="login-page">
    <div class="login-card">
      <!-- 头部 -->
      <div class="login-header">
        <div class="login-logo">⚡</div>
        <h1 class="login-title">Vue Admin</h1>
        <p class="login-subtitle">后台管理系统 · 综合实战项目</p>
      </div>

      <!-- 登录表单 -->
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        class="login-form"
        @keyup.enter.native="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
            placeholder="用户名（admin / editor / viewer）"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="密码（123456）"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          class="login-btn w-full"
          :loading="loading"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登 录' }}
        </el-button>
      </el-form>

      <!-- 快速账号提示 -->
      <div class="accounts-hint">
        <p class="hint-title">测试账号（密码均为 123456）：</p>
        <div class="account-list">
          <el-tag
            v-for="acc in testAccounts"
            :key="acc.username"
            :type="acc.type"
            class="account-tag"
            style="cursor:pointer"
            @click="fillAccount(acc)"
          >
            {{ acc.username }} · {{ acc.roleName }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: { username: 'admin', password: '123456' },
      loading: false,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                   { min: 6, message: '密码至少6位', trigger: 'blur' }]
      },
      testAccounts: [
        { username: 'superAdmin', password: '123456', roleName: '超级管理员', type: 'danger' },
        { username: 'admin',      password: '123456', roleName: '管理员',     type: 'warning' },
        { username: 'editor',     password: '123456', roleName: '编辑',       type: 'primary' },
        { username: 'viewer',     password: '123456', roleName: '查看者',     type: 'info' }
      ]
    }
  },
  methods: {
    fillAccount(acc) {
      this.form.username = acc.username
      this.form.password = acc.password
    },
    async handleLogin() {
      await this.$refs.loginForm.validate()
      this.loading = true
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$message.success('登录成功！')
        // 登录成功后跳转到目标页或仪表盘
        const redirect = this.$route.query.redirect || '/dashboard'
        this.$router.push(redirect)
      } catch (err) {
        this.$message.error(err.message || '登录失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  @include flex-center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 420px;
  background: $bg-white;
  border-radius: $radius-lg;
  padding: $spacing-xl $spacing-xxl;
  box-shadow: $shadow-dark;

  @include mobile {
    width: 92vw;
    padding: $spacing-lg $spacing-md;
  }
}

.login-header {
  text-align: center;
  margin-bottom: $spacing-xl;

  .login-logo { font-size: 48px; margin-bottom: $spacing-sm; }
  .login-title { font-size: $font-size-xxl; color: $text-primary; font-weight: 700; margin: 0; }
  .login-subtitle { font-size: $font-size-sm; color: $text-secondary; margin-top: $spacing-xs; }
}

.login-form {
  .el-form-item { margin-bottom: $spacing-md; }
}

.login-btn {
  height: 44px;
  font-size: $font-size-md;
  letter-spacing: 4px;
  margin-top: $spacing-sm;
}

.accounts-hint {
  margin-top: $spacing-lg;
  padding-top: $spacing-md;
  border-top: 1px dashed $border-light;

  .hint-title {
    font-size: $font-size-xs;
    color: $text-secondary;
    margin-bottom: $spacing-sm;
  }
}

.account-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
}

.account-tag {
  transition: $transition-fast;
  &:hover { transform: translateY(-1px); }
}
</style>
