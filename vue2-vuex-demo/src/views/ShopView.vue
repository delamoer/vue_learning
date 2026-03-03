<!-- views/ShopView.vue — 商城页，演示 dispatch Action + Getter 查询 -->
<template>
  <div>
    <div class="card">
      <div class="card-title">🛒 商品列表</div>
      <p v-if="!isLoggedIn" class="login-tip">
        ⚠️ 请先 <router-link to="/login">登录</router-link> 才能加入购物车
      </p>
      <div class="product-grid">
        <div
          v-for="p in products"
          :key="p.id"
          class="product-card"
        >
          <div class="product-emoji">{{ p.emoji }}</div>
          <div class="product-name">{{ p.name }}</div>
          <div class="product-price">¥{{ p.price.toFixed(2) }}</div>

          <div class="product-actions">
            <template v-if="isInCart(p.id)">
              <div class="qty-ctrl">
                <button @click="updateQty({ id: p.id, qty: qtyOf(p.id) - 1 })">−</button>
                <span>{{ qtyOf(p.id) }}</span>
                <button @click="updateQty({ id: p.id, qty: qtyOf(p.id) + 1 })">+</button>
              </div>
            </template>
            <template v-else>
              <button
                class="btn btn-primary btn-sm"
                :disabled="addingId === p.id"
                @click="handleAdd(p)"
              >
                {{ addingId === p.id ? '添加中...' : '加入购物车' }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters: cartGetters, mapActions: cartActions } = createNamespacedHelpers('cart')

export default {
  name: 'ShopView',
  data() {
    return {
      addingId: null,
      // 商品数据（实际项目从 API 获取，存在 Vuex state 里）
      products: [
        { id: 1, name: 'Vue.js 实战教程',    emoji: '📘', price: 59.00 },
        { id: 2, name: 'JavaScript 深度解析', emoji: '📗', price: 79.00 },
        { id: 3, name: '程序员专用咖啡杯',    emoji: '☕', price: 39.00 },
        { id: 4, name: '机械键盘·青轴版',    emoji: '⌨️', price: 299.00 },
        { id: 5, name: '4K 显示器 27寸',     emoji: '🖥️', price: 1599.00 },
        { id: 6, name: 'GitHub T恤',          emoji: '👕', price: 99.00 }
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    // 使用 createNamespacedHelpers 后不需要写命名空间前缀
    ...cartGetters(['isInCart', 'qtyOf', 'count'])
  },
  methods: {
    ...cartActions(['addToCart', 'updateQty']),

    async handleAdd(product) {
      try {
        this.addingId = product.id
        await this.addToCart(product)
        this.$store.dispatch('showToast', { msg: `已加入购物车：${product.name}`, type: 'success' })
      } catch (err) {
        this.$store.dispatch('showToast', { msg: err.message, type: 'error' })
        if (err.message === '请先登录') {
          this.$router.push({ name: 'Login', query: { redirect: '/cart' } })
        }
      } finally {
        this.addingId = null
      }
    }
  }
}
</script>

<style scoped>
.login-tip {
  background: #fef9c3;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 10px 14px;
  color: #92400e;
  font-size: 0.85rem;
  margin-bottom: 16px;
}
.login-tip a { color: #1d4ed8; font-weight: 600; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.product-card {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  transition: box-shadow .15s, border-color .15s;
}
.product-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); border-color: #93c5fd; }
.product-emoji { font-size: 2.4rem; margin-bottom: 8px; }
.product-name  { font-size: 0.85rem; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
.product-price { font-size: 1rem; font-weight: 800; color: #dc2626; margin-bottom: 12px; }
.product-actions { display: flex; justify-content: center; }
.qty-ctrl {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #eff6ff;
  border-radius: 20px;
  padding: 4px 12px;
}
.qty-ctrl button {
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2563eb;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .1s;
}
.qty-ctrl button:hover { background: rgba(59,130,246,0.15); }
.qty-ctrl span { font-weight: 700; color: #1e293b; min-width: 16px; text-align: center; }
</style>
