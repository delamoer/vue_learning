<!-- views/UserView.vue — 用户中心 -->
<template>
  <div>
    <div class="card user-profile">
      <div class="avatar-large">{{ displayName[0] }}</div>
      <div class="user-details">
        <div class="user-name">{{ displayName }}</div>
        <div class="user-roles">
          <span
            v-for="role in roles"
            :key="role"
            class="role-badge"
            :class="role === 'admin' ? 'admin' : 'normal'"
          >{{ role }}</span>
        </div>
        <div class="user-id">用户 ID：{{ userId }}</div>
      </div>
      <button class="btn btn-danger btn-sm" @click="handleLogout" style="margin-left:auto">退出登录</button>
    </div>

    <div class="card">
      <div class="card-title">📊 我的数据</div>
      <div class="data-grid">
        <div class="data-item">
          <div class="data-val blue">{{ cartCount }}</div>
          <div class="data-label">购物车件数</div>
        </div>
        <div class="data-item">
          <div class="data-val red">{{ totalFormatted }}</div>
          <div class="data-label">购物车金额</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">🔑 Vuex Token 状态</div>
      <div class="token-info">
        <div class="token-row">
          <span class="token-label">是否已登录</span>
          <span :class="isLoggedIn ? 'green' : 'red'">{{ isLoggedIn ? '是' : '否' }}</span>
        </div>
        <div class="token-row">
          <span class="token-label">Token 值</span>
          <span class="token-val">{{ token || '（无）' }}</span>
        </div>
        <div class="token-row">
          <span class="token-label">localStorage 持久化</span>
          <span class="green">是（刷新不丢失）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserView',
  computed: {
    ...mapState('user',  ['token', 'roles']),
    ...mapGetters('user', ['isLoggedIn', 'displayName']),
    userId() { return this.$store.state.user.id },
    ...mapGetters('cart', ['cartCount', 'totalFormatted'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    async handleLogout() {
      this.logout()
      this.$store.dispatch('showToast', { msg: '已退出登录', type: 'success' })
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.user-profile { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.avatar-large {
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem; font-weight: 700; color: #fff; flex-shrink: 0;
}
.user-details { flex: 1; }
.user-name  { font-size: 1.2rem; font-weight: 800; color: #1e293b; }
.user-id    { font-size: 0.8rem; color: #94a3b8; margin-top: 4px; }
.user-roles { display: flex; gap: 6px; margin-top: 6px; }
.role-badge { font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; }
.role-badge.admin  { background: #ede9fe; color: #7c3aed; }
.role-badge.normal { background: #dbeafe; color: #1d4ed8; }
.data-grid { display: flex; gap: 20px; }
.data-item { background: #f8fafc; border-radius: 8px; padding: 16px 24px; text-align: center; }
.data-val   { font-size: 1.6rem; font-weight: 800; }
.data-label { font-size: 0.78rem; color: #64748b; margin-top: 4px; }
.data-val.blue { color: #2563eb; }
.data-val.red  { color: #dc2626; }
.token-info { background: #0f172a; border-radius: 8px; padding: 14px 18px; }
.token-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #1e293b; font-size: 0.85rem; }
.token-row:last-child { border-bottom: none; }
.token-label { color: #64748b; }
.token-val { color: #7dd3fc; font-family: monospace; font-size: 0.8rem; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.green { color: #22c55e; }
.red   { color: #ef4444; }
</style>
