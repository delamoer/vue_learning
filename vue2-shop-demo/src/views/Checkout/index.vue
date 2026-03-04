<template>
  <div class="checkout-page container">
    <h2 class="page-heading">确认订单</h2>

    <!-- 步骤条 -->
    <el-steps :active="step" finish-status="success" align-center class="steps">
      <el-step title="购物车" />
      <el-step title="确认订单" />
      <el-step title="支付" />
      <el-step title="完成" />
    </el-steps>

    <div v-if="selectedItems.length === 0" class="empty-state">
      <div class="empty-icon">📦</div>
      <p>没有需要结算的商品</p>
      <el-button @click="$router.push('/cart')">返回购物车</el-button>
    </div>

    <div v-else class="checkout-layout">
      <!-- 左：收货地址 + 商品清单 -->
      <div class="checkout-main">

        <!-- 收货地址 -->
        <div class="section card">
          <h4 class="section-head"><i class="el-icon-location-outline" /> 收货地址</h4>
          <div class="address-list">
            <div
              v-for="addr in addresses"
              :key="addr.id"
              :class="['address-card', { active: selectedAddressId === addr.id }]"
              @click="selectedAddressId = addr.id"
            >
              <div class="addr-info">
                <span class="addr-name">{{ addr.name }}</span>
                <span class="addr-phone">{{ addr.phone }}</span>
                <el-tag v-if="addr.isDefault" size="mini" type="danger">默认</el-tag>
              </div>
              <p class="addr-detail">{{ addr.province }} {{ addr.city }} {{ addr.district }} {{ addr.detail }}</p>
            </div>
          </div>
        </div>

        <!-- 商品清单 -->
        <div class="section card">
          <h4 class="section-head"><i class="el-icon-shopping-bag-1" /> 商品清单</h4>
          <div class="order-items">
            <div v-for="item in selectedItems" :key="item.key" class="order-item">
              <img :src="item.image" class="order-img" />
              <div class="order-info">
                <p class="order-name">{{ item.name }}</p>
                <p class="order-specs">
                  <span v-for="(val, key) in item.specs" :key="key">{{ key }}：{{ val }} </span>
                </p>
              </div>
              <span class="order-price">¥{{ item.price.toLocaleString() }} × {{ item.quantity }}</span>
              <span class="order-subtotal">¥{{ (item.price * item.quantity).toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <!-- 订单备注 -->
        <div class="section card">
          <h4 class="section-head"><i class="el-icon-edit-outline" /> 订单备注</h4>
          <el-input
            v-model="remark"
            type="textarea"
            :rows="3"
            placeholder="有什么想告诉商家的？（选填）"
          />
        </div>
      </div>

      <!-- 右：金额汇总 -->
      <div class="order-summary">
        <div class="summary-card card">
          <h4 class="section-head">金额汇总</h4>
          <div class="summary-row">
            <span>商品金额</span>
            <span>¥{{ totalPrice.toLocaleString() }}</span>
          </div>
          <div class="summary-row">
            <span>运费</span>
            <span :class="shippingFee === 0 ? 'free' : ''">
              {{ shippingFee === 0 ? '免运费' : '¥' + shippingFee }}
            </span>
          </div>
          <div class="summary-divider" />
          <div class="summary-total">
            <span>实付金额</span>
            <span class="total-price">¥{{ actualTotal.toLocaleString() }}</span>
          </div>
          <el-button
            type="danger"
            class="submit-btn"
            size="large"
            :loading="submitting"
            @click="handleSubmit"
          >
            提交订单
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { userApi, orderApi } from '@/api/user'

export default {
  name: 'CheckoutPage',
  data() {
    return {
      step: 1,
      addresses: [],
      selectedAddressId: null,
      remark: '',
      submitting: false
    }
  },
  computed: {
    ...mapGetters({
      selectedItems: 'cart/selectedItems',
      totalPrice: 'cart/totalPrice'
    }),
    shippingFee() { return this.totalPrice >= 99 ? 0 : 10 },
    actualTotal() { return this.totalPrice + this.shippingFee }
  },
  created() {
    this.loadAddresses()
  },
  methods: {
    ...mapActions({ removeSelected: 'cart/removeSelected' }),
    async loadAddresses() {
      const res = await userApi.getAddresses()
      this.addresses = res.data
      const def = res.data.find(a => a.isDefault)
      this.selectedAddressId = def ? def.id : (res.data[0]?.id || null)
    },
    async handleSubmit() {
      if (!this.selectedAddressId) {
        this.$message.warning('请选择收货地址')
        return
      }
      this.submitting = true
      try {
        const address = this.addresses.find(a => a.id === this.selectedAddressId)
        const res = await orderApi.submit({
          address,
          items: this.selectedItems,
          totalAmount: this.actualTotal,
          remark: this.remark
        })
        // 下单成功：从购物车移除已结算商品
        this.removeSelected()
        this.$router.push({ name: 'OrderSuccess', params: { orderId: res.orderId } })
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-page { padding-top: 20px; padding-bottom: 40px; }
.page-heading { font-size: 22px; font-weight: 700; margin-bottom: 20px; }
.steps { margin-bottom: 30px; }

.checkout-layout { display: flex; gap: 20px; align-items: flex-start; }
.checkout-main { flex: 1; display: flex; flex-direction: column; gap: 16px; }
.order-summary { width: 260px; flex-shrink: 0; }

.section-head { font-size: 15px; font-weight: 600; margin-bottom: 14px; i { margin-right: 6px; } }

// 地址
.address-list { display: flex; flex-direction: column; gap: 10px; }
.address-card {
  padding: 14px 16px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
  &.active { border-color: #e4393c; background: #fff9f9; }
  &:hover { border-color: #e4393c; }
}
.addr-info { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.addr-name { font-weight: 600; font-size: 14px; }
.addr-phone { font-size: 13px; color: #888; }
.addr-detail { font-size: 13px; color: #555; }

// 商品列表
.order-items { display: flex; flex-direction: column; gap: 12px; }
.order-item { display: flex; align-items: center; gap: 12px; }
.order-img { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; }
.order-info { flex: 1; }
.order-name { font-size: 13px; color: #333; }
.order-specs { font-size: 12px; color: #999; }
.order-price { width: 140px; text-align: center; font-size: 13px; color: #888; }
.order-subtotal { width: 80px; text-align: right; font-size: 14px; color: #e4393c; font-weight: 600; }

// 汇总
.summary-card { }
.summary-row { display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 10px; }
.free { color: #67c23a; font-weight: 600; }
.summary-divider { height: 1px; background: #f0f0f0; margin: 12px 0; }
.summary-total {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-weight: 700;
}
.total-price { font-size: 24px; color: #e4393c; }
.submit-btn { width: 100%; height: 46px; font-size: 16px; }
.empty-state { text-align: center; padding: 80px 0; .empty-icon { font-size: 60px; } p { margin: 12px 0 20px; color: #999; } }
</style>
