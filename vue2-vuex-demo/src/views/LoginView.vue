<!-- views/LoginView.vue — 登录页，演示 dispatch action + 异步处理 -->
<template>
  <div class="login-wrap">
    <div class="login-card">
      <h1 class="login-title">🔐 账号登录</h1>
      <p class="login-hint">
        演示账号：<br>
        <code>admin</code> / <code>123456</code>（管理员角色）<br>
        <code>user</code> / <code>123456</code>（普通用户角色）
      </p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input v-model="form.username" type="text" placeholder="输入用户名" :disabled="loading" />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="form.password" type="password" placeholder="输入密码" :disabled="loading" />
        </div>

        <!-- loginError 来自 Vuex state.user.loginError -->
        <div v-if="loginError" class="error-msg">{{ loginError }}</div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>

    <div class="login-info">
      <h3>这里演示了：</h3>
      <ul>
        <li>组件 <code>dispatch('user/login', form)</code> 调用异步 Action</li>
        <li>Action 内部：loading → API 请求 → commit SET_TOKEN + SET_USER → finally loading=false</li>
        <li>组件 <code>await dispatch()</code> 等待 Action 完成后跳转</li>
        <li>登录错误信息存在 Vuex state，而不是组件 data</li>
        <li>登录成功跳回 redirect 参数指向的页面</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      form: { username: '', password: '' }
    }
  },
  computed: {
    // 直接读取 Vuex user 模块的状态
    ...mapState('user', ['loading', 'loginError'])
  },
  methods: {
    ...mapActions('user', ['login']),

    async handleLogin() {
      if (!this.form.username || !this.form.password) return
      try {
        await this.login(this.form)
        // 登录成功提示
        await this.$store.dispatch('showToast', {
          msg: `欢迎回来，${this.$store.state.user.name}！`,
          type: 'success'
        })
        // 跳回来源页，否则去首页
        const redirect = this.$route.query.redirect || '/home'
        this.$router.push(redirect)
      } catch {
        // loginError 已经被 Action 中的 commit 设置，直接显示
      }
    }
  },
  beforeMount() {
    // 已登录则直接跳首页
    if (this.$store.getters['user/isLoggedIn']) {
      this.$router.replace('/home')
    }
  }
}
</script>

<style scoped>
.login-wrap {
  max-width: 440px;
  margin: 40px auto;
}
.login-card {
  background: #fff;
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,.08);
}
.login-title { font-size: 1.4rem; font-weight: 800; color: #1e293b; margin-bottom: 12px; }
.login-hint {
  font-size: 0.82rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 10px 14px;
  color: #0369a1;
  margin-bottom: 20px;
  line-height: 2;
}
.login-hint code { background: #e0f2fe; padding: 1px 4px; border-radius: 3px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 6px; }
.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color .15s;
  outline: none;
}
.form-group input:focus { border-color: #3b82f6; }
.form-group input:disabled { background: #f8fafc; color: #94a3b8; }
.error-msg {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 8px 12px;
  color: #dc2626;
  font-size: 0.83rem;
  margin-bottom: 14px;
}
.btn-block { width: 100%; justify-content: center; padding: 11px; font-size: 0.95rem; }
.login-info {
  background: #1e293b;
  border-radius: 12px;
  padding: 20px 24px;
  margin-top: 20px;
  color: #94a3b8;
  font-size: 0.83rem;
}
.login-info h3 { color: #e2e8f0; font-size: 0.88rem; margin-bottom: 10px; }
.login-info ul { padding-left: 18px; line-height: 2; }
.login-info code { background: rgba(255,255,255,0.1); color: #7dd3fc; padding: 1px 4px; border-radius: 3px; }
</style>
