<!-- views/CartView.vue — 购物车，展示 Getters 计算总价 + 结算演示 -->
<template>
  <div>
    <div class="card">
      <div class="card-title">🛒 购物车</div>

      <!-- 空购物车 -->
      <div v-if="items.length === 0" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <div class="empty-text">购物车还空空如也</div>
        <router-link to="/shop" class="btn btn-primary">去选购商品</router-link>
      </div>

      <!-- 商品列表 -->
      <div v-else>
        <div class="cart-item" v-for="item in items" :key="item.id">
          <div class="item-info">
            <span class="item-emoji">{{ item.emoji }}</span>
            <div>
              <div class="item-name">{{ item.name }}</div>
              <div class="item-unit-price">单价 ¥{{ item.price.toFixed(2) }}</div>
            </div>
          </div>

          <div class="item-controls">
            <div class="qty-ctrl">
              <button @click="updateQty({ id: item.id, qty: item.qty - 1 })">−</button>
              <span>{{ item.qty }}</span>
              <button @click="updateQty({ id: item.id, qty: item.qty + 1 })">+</button>
            </div>
            <div class="item-subtotal">¥{{ (item.price * item.qty).toFixed(2) }}</div>
            <button class="btn-remove" @click="removeFromCart(item.id)" title="移除">✕</button>
          </div>
        </div>

        <!-- 汇总 -->
        <div class="cart-summary">
          <div class="summary-row">
            <span>共 {{ cartCount }} 件商品</span>
            <span class="summary-total">合计：{{ totalFormatted }}</span>
          </div>
          <div class="summary-actions">
            <button class="btn btn-outline" @click="clearCart">清空购物车</button>
            <button
              class="btn btn-primary"
              :disabled="checkingOut"
              @click="handleCheckout"
            >
              {{ checkingOut ? '结算中...' : '立即结算' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Getter 说明 -->
    <div class="card">
      <div class="card-title">⚙️ 这里用到的 Vuex Getters</div>
      <div class="code-info">
        <div class="code-row">
          <span class="code-key">cart/count</span>
          <span class="code-arrow">→</span>
          <span class="code-val">{{ cartCount }}（用 reduce 累加 qty）</span>
        </div>
        <div class="code-row">
          <span class="code-key">cart/total</span>
          <span class="code-arrow">→</span>
          <span class="code-val">{{ total }}（price × qty 求和）</span>
        </div>
        <div class="code-row">
          <span class="code-key">cart/totalFormatted</span>
          <span class="code-arrow">→</span>
          <span class="code-val">{{ totalFormatted }}（基于 total getter 格式化）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CartView',
  data() {
    return { checkingOut: false }
  },
  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['cartCount', 'total', 'totalFormatted'])
  },
  methods: {
    // mapMutations 映射购物车 Mutation
    ...mapMutations('cart', {
      updateQty:      'UPDATE_QTY',     // this.updateQty(payload)
      removeFromCart: 'REMOVE_FROM_CART',
      clearCart:      'CLEAR_CART'
    }),

    // mapActions 映射异步结算
    ...mapActions('cart', ['checkout']),

    async handleCheckout() {
      this.checkingOut = true
      try {
        const result = await this.checkout()
        this.$store.dispatch('showToast', {
          msg: `结算成功！订单号：${result.orderId}`,
          type: 'success'
        })
      } catch (err) {
        this.$store.dispatch('showToast', { msg: err.message, type: 'error' })
      } finally {
        this.checkingOut = false
      }
    }
  }
}
</script>

<style scoped>
.empty-cart { text-align: center; padding: 48px 0; }
.empty-icon { font-size: 3.5rem; margin-bottom: 12px; }
.empty-text { color: #94a3b8; font-size: 1rem; margin-bottom: 20px; }

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
  gap: 12px;
}
.item-info { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.item-emoji { font-size: 1.8rem; }
.item-name { font-size: 0.9rem; font-weight: 600; color: #1e293b; }
.item-unit-price { font-size: 0.78rem; color: #94a3b8; margin-top: 2px; }

.item-controls { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.qty-ctrl {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  border-radius: 20px;
  padding: 4px 10px;
}
.qty-ctrl button {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: #2563eb;
  cursor: pointer;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-ctrl button:hover { background: rgba(59,130,246,0.15); }
.qty-ctrl span { font-weight: 700; color: #1e293b; min-width: 14px; text-align: center; }
.item-subtotal { font-size: 0.95rem; font-weight: 700; color: #dc2626; min-width: 72px; text-align: right; }
.btn-remove { background: none; border: none; font-size: 0.85rem; color: #94a3b8; cursor: pointer; padding: 4px; border-radius: 4px; }
.btn-remove:hover { color: #ef4444; background: #fef2f2; }

.cart-summary {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.summary-row { display: flex; justify-content: space-between; align-items: center; color: #475569; font-size: 0.9rem; }
.summary-total { font-size: 1.1rem; font-weight: 800; color: #dc2626; }
.summary-actions { display: flex; justify-content: flex-end; gap: 12px; }

.code-info { background: #0f172a; border-radius: 8px; padding: 14px 18px; }
.code-row { display: flex; align-items: center; gap: 10px; padding: 4px 0; font-family: monospace; font-size: 0.83rem; }
.code-key { color: #7dd3fc; }
.code-arrow { color: #475569; }
.code-val { color: #a3e635; }
</style>
