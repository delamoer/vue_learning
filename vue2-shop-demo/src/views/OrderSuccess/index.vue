<template>
  <div class="success-page">
    <div class="success-card">
      <div class="success-icon">✅</div>
      <h2 class="success-title">订单提交成功！</h2>
      <p class="success-subtitle">感谢您的购买，我们将尽快为您发货</p>
      <div class="order-no">
        订单编号：<strong>{{ orderId }}</strong>
        <el-button type="text" class="copy-btn" @click="copyOrderId">复制</el-button>
      </div>
      <div class="tip-list">
        <div class="tip-item"><i class="el-icon-time" /> 预计 1-3 个工作日发货</div>
        <div class="tip-item"><i class="el-icon-phone" /> 客服热线：400-000-0000</div>
      </div>
      <div class="action-btns">
        <el-button @click="$router.push('/')">继续购物</el-button>
        <el-button type="danger" @click="$router.push('/cart')">查看购物车</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { generateOrderNo } from '@/utils/format'

export default {
  name: 'OrderSuccessPage',
  data() {
    return {
      orderId: this.$route.params.orderId || generateOrderNo()
    }
  },
  methods: {
    copyOrderId() {
      navigator.clipboard?.writeText(this.orderId)
      this.$message.success('订单号已复制')
    }
  }
}
</script>

<style lang="scss" scoped>
.success-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.success-card {
  width: 480px;
  background: #fff;
  border-radius: 16px;
  padding: 50px 40px;
  text-align: center;
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
}
.success-icon { font-size: 64px; margin-bottom: 16px; }
.success-title { font-size: 24px; font-weight: 700; color: #333; margin-bottom: 8px; }
.success-subtitle { font-size: 14px; color: #888; margin-bottom: 24px; }
.order-no {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 24px;
  strong { color: #e4393c; }
  .copy-btn { padding: 0; font-size: 12px; }
}
.tip-list { margin-bottom: 30px; }
.tip-item { font-size: 13px; color: #888; margin-bottom: 8px; i { margin-right: 6px; color: #e4393c; } }
.action-btns { display: flex; gap: 12px; justify-content: center; }
</style>
