<template>
  <div class="cart-page container">
    <h2 class="page-heading">我的购物车</h2>

    <!-- 空购物车 -->
    <div v-if="items.length === 0" class="cart-empty">
      <div class="empty-icon">🛒</div>
      <p>购物车还是空的，去挑选心仪的商品吧</p>
      <el-button type="danger" @click="$router.push('/')">去首页逛逛</el-button>
    </div>

    <div v-else class="cart-layout">
      <!-- 左：商品列表 -->
      <div class="cart-list">
        <!-- 表头 -->
        <div class="cart-header">
          <el-checkbox
            :value="isAllSelected"
            @change="handleToggleAll"
          >全选</el-checkbox>
          <span class="col-name">商品信息</span>
          <span class="col-price">单价</span>
          <span class="col-qty">数量</span>
          <span class="col-subtotal">小计</span>
          <span class="col-action">操作</span>
        </div>

        <!-- 商品行 -->
        <transition-group name="slide-up" tag="div" class="cart-items">
          <div v-for="item in items" :key="item.key" class="cart-item">
            <el-checkbox
              :value="item.selected"
              @change="handleToggle(item.key)"
            />

            <!-- 商品图 + 信息 -->
            <div class="item-info" @click="goDetail(item.id)">
              <img :src="item.image" class="item-img" :alt="item.name" />
              <div class="item-meta">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-specs">
                  <span v-for="(val, key) in item.specs" :key="key">{{ key }}：{{ val }} </span>
                </p>
              </div>
            </div>

            <!-- 单价 -->
            <div class="col-price price">¥{{ item.price.toLocaleString() }}</div>

            <!-- 数量 -->
            <div class="col-qty">
              <el-input-number
                :value="item.quantity"
                :min="1"
                :max="99"
                size="mini"
                @change="val => handleQtyChange(item.key, val)"
              />
            </div>

            <!-- 小计 -->
            <div class="col-subtotal price">
              ¥{{ (item.price * item.quantity).toLocaleString() }}
            </div>

            <!-- 删除 -->
            <div class="col-action">
              <el-popconfirm
                title="确认删除该商品？"
                confirm-button-text="删除"
                cancel-button-text="取消"
                @confirm="handleRemove(item.key)"
              >
                <el-button slot="reference" type="text" class="del-btn">
                  <i class="el-icon-delete" />
                </el-button>
              </el-popconfirm>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- 右：结算面板 -->
      <div class="checkout-panel">
        <div class="panel-card">
          <h4 class="panel-title">结算信息</h4>
          <div class="panel-row">
            <span>商品总数</span>
            <span>{{ selectedCount }} 件</span>
          </div>
          <div class="panel-row">
            <span>商品总价</span>
            <span class="price">¥{{ totalPrice.toLocaleString() }}</span>
          </div>
          <div class="panel-row">
            <span>运费</span>
            <span class="free">{{ totalPrice >= 99 ? '免运费' : '¥10' }}</span>
          </div>
          <div class="panel-divider" />
          <div class="panel-total">
            <span>应付总计</span>
            <span class="total-price">
              ¥{{ actualTotal.toLocaleString() }}
            </span>
          </div>

          <el-button
            type="danger"
            size="large"
            class="checkout-btn"
            :disabled="selectedCount === 0"
            @click="handleCheckout"
          >
            去结算 ({{ selectedCount }})
          </el-button>

          <p v-if="selectedCount === 0" class="no-select-tip">请先选择商品</p>
        </div>

        <!-- 清空购物车 -->
        <div class="clear-btn-wrap">
          <el-button type="text" class="text-btn" @click="handleClear">清空购物车</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartPage',
  computed: {
    ...mapState({ items: state => state.cart.items }),
    ...mapGetters({
      isAllSelected: 'cart/isAllSelected',
      selectedItems: 'cart/selectedItems',
      totalPrice: 'cart/totalPrice',
      selectedCount: 'cart/selectedCount'
    }),
    actualTotal() {
      const shipping = this.totalPrice >= 99 ? 0 : (this.selectedCount > 0 ? 10 : 0)
      return this.totalPrice + shipping
    }
  },
  methods: {
    ...mapActions({
      updateQuantity: 'cart/updateQuantity',
      removeItem: 'cart/removeItem',
      toggleSelect: 'cart/toggleSelect',
      toggleAll: 'cart/toggleAll',
      removeSelected: 'cart/removeSelected',
      clear: 'cart/CLEAR'
    }),

    handleToggle(key) { this.toggleSelect(key) },
    handleToggleAll(val) { this.toggleAll(val) },
    handleQtyChange(key, quantity) { this.updateQuantity({ key, quantity }) },
    handleRemove(key) {
      this.removeItem(key)
      this.$message.success('已移除')
    },
    handleClear() {
      this.$confirm('确认清空购物车？', '提示', { type: 'warning' }).then(() => {
        this.$store.commit('cart/CLEAR')
        this.$store.dispatch('cart/persist')
        this.$message.success('已清空')
      }).catch(() => {})
    },
    goDetail(id) {
      this.$router.push({ name: 'ProductDetail', params: { id } })
    },
    handleCheckout() {
      if (!this.$store.getters['user/isLoggedIn']) {
        this.$router.push({ name: 'Login', query: { redirect: '/checkout' } })
        return
      }
      this.$router.push({ name: 'Checkout' })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-page { padding-top: 20px; padding-bottom: 40px; }
.page-heading { font-size: 22px; font-weight: 700; margin-bottom: 20px; }

.cart-empty {
  text-align: center;
  padding: 80px 0;
  .empty-icon { font-size: 64px; }
  p { font-size: 15px; color: #999; margin: 16px 0 24px; }
}

.cart-layout { display: flex; gap: 20px; align-items: flex-start; }
.cart-list { flex: 1; min-width: 0; }

// 表头
.cart-header {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
  font-size: 13px;
  color: #888;
  gap: 10px;
  .col-name { flex: 1; margin-left: 10px; }
  .col-price, .col-qty, .col-subtotal, .col-action { width: 110px; text-align: center; }
}

.cart-items { background: #fff; border: 1px solid #f0f0f0; border-radius: 0 0 8px 8px; }

.cart-item {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 10px;
  border-bottom: 1px solid #f5f5f5;
  &:last-child { border-bottom: none; }
}

.item-info {
  flex: 1;
  display: flex;
  gap: 12px;
  cursor: pointer;
  &:hover .item-name { color: #e4393c; }
}
.item-img { width: 72px; height: 72px; object-fit: cover; border-radius: 6px; background: #f9f9f9; }
.item-name { font-size: 13px; color: #333; margin-bottom: 6px; line-height: 1.5; }
.item-specs { font-size: 12px; color: #999; }

.col-price, .col-qty, .col-subtotal, .col-action { width: 110px; text-align: center; flex-shrink: 0; }
.price { color: #e4393c; font-weight: 600; }
.del-btn { color: #999; font-size: 18px; &:hover { color: #e4393c; } }

// 结算面板
.checkout-panel { width: 240px; flex-shrink: 0; }
.panel-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  margin-bottom: 10px;
}
.panel-title { font-size: 15px; font-weight: 700; margin-bottom: 16px; }
.panel-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #555;
  margin-bottom: 12px;
}
.free { color: #67c23a; }
.panel-divider { height: 1px; background: #f0f0f0; margin: 12px 0; }
.panel-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin-bottom: 16px;
}
.total-price { font-size: 22px; color: #e4393c; }
.checkout-btn { width: 100%; font-size: 15px; }
.no-select-tip { text-align: center; font-size: 12px; color: #999; margin-top: 8px; }
.clear-btn-wrap { text-align: center; }
.text-btn { color: #999; font-size: 13px; &:hover { color: #e4393c; } }
</style>
