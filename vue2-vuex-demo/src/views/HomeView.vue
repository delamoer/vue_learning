<!-- views/HomeView.vue — 首页，展示 Vuex state 读取和基本操作 -->
<template>
  <div>
    <div class="card">
      <div class="card-title">📦 Vuex State 实时监控</div>
      <p style="color:#64748b; font-size:0.88rem; margin-bottom:16px">
        以下数据直接从 Vuex Store 读取，任何组件修改后此处会自动更新。
      </p>

      <div class="state-grid">
        <div class="state-item">
          <div class="state-label">登录状态</div>
          <div class="state-value" :class="isLoggedIn ? 'green' : 'red'">
            {{ isLoggedIn ? '✅ 已登录' : '❌ 未登录' }}
          </div>
        </div>
        <div class="state-item">
          <div class="state-label">用户名</div>
          <div class="state-value">{{ displayName }}</div>
        </div>
        <div class="state-item">
          <div class="state-label">用户角色</div>
          <div class="state-value">{{ roles.join(', ') || '—' }}</div>
        </div>
        <div class="state-item">
          <div class="state-label">购物车件数</div>
          <div class="state-value blue">{{ cartCount }} 件</div>
        </div>
        <div class="state-item">
          <div class="state-label">购物车总价</div>
          <div class="state-value blue">{{ cartTotalFormatted }}</div>
        </div>
        <div class="state-item">
          <div class="state-label">是否管理员</div>
          <div class="state-value" :class="isAdmin ? 'green' : 'muted'">
            {{ isAdmin ? '是' : '否' }}
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">💡 快速操作演示</div>
      <div class="demo-btns">
        <router-link to="/shop" class="btn btn-primary">去商城添加商品</router-link>
        <router-link to="/cart" class="btn btn-outline">查看购物车</router-link>
        <button v-if="!isLoggedIn" class="btn btn-success" @click="$router.push('/login')">
          去登录
        </button>
        <button v-else class="btn btn-danger" @click="handleLogout">退出登录</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">📖 本项目 Vuex 结构说明</div>
      <div class="store-structure">
        <div class="module-box root-box">
          <div class="module-title">根 Store</div>
          <div class="module-state">state: globalLoading, toast</div>
          <div class="module-children">
            <div class="module-box user-box">
              <div class="module-title">user 模块（namespaced）</div>
              <div class="module-state">state: id, name, token, roles, loading</div>
              <div class="module-state">getters: isLoggedIn, isAdmin, displayName</div>
              <div class="module-state">mutations: SET_USER, SET_TOKEN, CLEAR_AUTH</div>
              <div class="module-state">actions: login（异步）, logout</div>
            </div>
            <div class="module-box cart-box">
              <div class="module-title">cart 模块（namespaced）</div>
              <div class="module-state">state: items[]</div>
              <div class="module-state">getters: count, total, isInCart, qtyOf</div>
              <div class="module-state">mutations: ADD, REMOVE, UPDATE_QTY, CLEAR</div>
              <div class="module-state">actions: addToCart（读 rootGetters 验证登录）, checkout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapState('user', ['roles']),
    ...mapGetters('user', ['isLoggedIn', 'displayName', 'isAdmin']),
    ...mapGetters('cart', ['cartCount', 'cartTotalFormatted'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    async handleLogout() {
      this.logout()
      this.$store.dispatch('showToast', { msg: '已退出登录', type: 'success' })
    }
  }
}
</script>

<style scoped>
.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}
.state-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}
.state-label { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 4px; }
.state-value { font-size: 0.95rem; font-weight: 700; color: #1e293b; }
.state-value.green { color: #16a34a; }
.state-value.red   { color: #dc2626; }
.state-value.blue  { color: #2563eb; }
.state-value.muted { color: #94a3b8; }
.demo-btns { display: flex; flex-wrap: wrap; gap: 12px; }
.store-structure { margin-top: 8px; }
.module-box { border-radius: 8px; padding: 12px; margin-top: 8px; }
.root-box  { background: #f1f5f9; border: 1.5px solid #94a3b8; }
.user-box  { background: #eff6ff; border: 1.5px solid #93c5fd; }
.cart-box  { background: #f0fdf4; border: 1.5px solid #86efac; }
.module-title { font-weight: 700; font-size: 0.85rem; color: #1e293b; margin-bottom: 6px; }
.module-state { font-size: 0.78rem; color: #475569; font-family: monospace; line-height: 1.9; }
.module-children { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px; }
@media(max-width:600px){ .module-children { grid-template-columns: 1fr; } }
</style>
