<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Logo -->
      <div class="login-logo">
        <span class="logo-icon">🛒</span>
        <span class="logo-text">VueShop</span>
      </div>
      <h2 class="login-title">欢迎登录</h2>

      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.native.prevent="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            size="medium"
            autofocus
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            size="medium"
            show-password
          />
        </el-form-item>
        <div class="demo-tip">
          <el-alert type="info" :closable="false" show-icon>
            <span slot="title">
              演示账号：<strong>admin</strong>  &nbsp; 密码：<strong>123456</strong>
            </span>
          </el-alert>
        </div>
        <el-form-item>
          <el-button
            type="danger"
            native-type="submit"
            class="login-btn"
            :loading="loading"
          >
            {{ loading ? '登录中...' : '登 录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { userApi } from '@/api/user'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: { username: 'admin', password: '123456' },
      loading: false,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '密码不少于6位', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions({ saveLogin: 'user/login' }),
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        this.loading = true
        try {
          const result = await userApi.login(this.form.username, this.form.password)
          await this.saveLogin({ token: result.token, userInfo: result.userInfo })
          this.$message.success('登录成功！')
          const redirect = this.$route.query.redirect || '/'
          this.$router.push(redirect)
        } catch (e) {
          this.$message.error(e.message || '登录失败')
        } finally {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff9f9 0%, #ffecec 100%);
}
.login-card {
  width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
}
.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
  .logo-icon { font-size: 28px; }
  .logo-text { font-size: 24px; font-weight: 700; color: #e4393c; }
}
.login-title { text-align: center; font-size: 18px; color: #555; margin-bottom: 28px; }
.demo-tip { margin-bottom: 16px; }
.login-btn { width: 100%; height: 44px; font-size: 16px; }
</style>
