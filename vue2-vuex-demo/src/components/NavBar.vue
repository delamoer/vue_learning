<!-- components/NavBar.vue — 导航栏，展示登录状态和购物车角标 -->
<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/home" class="navbar-brand">🛍 Vuex Demo</router-link>

      <div class="navbar-links">
        <router-link to="/home">首页</router-link>
        <router-link to="/shop">商城</router-link>
        <router-link to="/cart" class="cart-link">
          购物车
          <!-- cartCount 来自 Vuex getter -->
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>
      </div>

      <div class="navbar-right">
        <!-- 已登录 -->
        <template v-if="isLoggedIn">
          <router-link to="/user" class="user-info">
            <span class="avatar">{{ displayName[0] }}</span>
            {{ displayName }}
          </router-link>
          <button class="btn btn-sm btn-outline" @click="handleLogout">退出</button>
        </template>
        <!-- 未登录 -->
        <template v-else>
          <router-link to="/login" class="btn btn-sm btn-primary">登录</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    // 使用带命名空间的 mapGetters
    ...mapGetters('user', ['isLoggedIn', 'displayName']),
    ...mapGetters('cart', ['cartCount'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    async handleLogout() {
      this.logout()
      await this.$store.dispatch('showToast', { msg: '已退出登录', type: 'success' })
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #1e293b;
  color: #e2e8f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}
.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.navbar-brand {
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
}
.navbar-links {
  display: flex;
  gap: 4px;
  flex: 1;
}
.navbar-links a, .cart-link {
  color: #94a3b8;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all .15s;
  position: relative;
}
.navbar-links a:hover, .cart-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
.navbar-links a.router-link-active { color: #fff; background: rgba(59,130,246,0.3); }
.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.navbar-right { display: flex; align-items: center; gap: 10px; }
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e2e8f0;
  text-decoration: none;
  font-size: 0.88rem;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
}
</style>
