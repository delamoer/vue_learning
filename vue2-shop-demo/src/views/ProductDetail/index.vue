<template>
  <div class="product-detail-page container">
    <!-- 加载中 -->
    <el-skeleton v-if="loading" :rows="10" animated />

    <!-- 未找到 -->
    <div v-else-if="!product" class="empty-state">
      <div class="empty-icon">😕</div>
      <p>商品不存在或已下架</p>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>

    <template v-else>
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <router-link :to="{ name: 'ProductList', query: { categoryId: product.categoryId } }">
          {{ product.category }}
        </router-link> &gt;
        <span>{{ product.name }}</span>
      </div>

      <!-- 商品主区域 -->
      <div class="detail-main card">
        <!-- 左：图片画廊 -->
        <div class="gallery">
          <div class="main-img-wrap">
            <img :src="currentImg" class="main-img" :alt="product.name" />
          </div>
          <div class="thumb-list">
            <div
              v-for="(img, idx) in product.images"
              :key="idx"
              :class="['thumb', { active: currentImgIdx === idx }]"
              @click="currentImgIdx = idx"
            >
              <img :src="img" />
            </div>
          </div>
        </div>

        <!-- 右：信息+购买区 -->
        <div class="detail-info">
          <!-- 标签 -->
          <div class="tags">
            <span v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <!-- 标题 -->
          <h1 class="product-title">{{ product.name }}</h1>

          <!-- 评价简介 -->
          <div class="meta-row">
            <el-rate :value="product.rating" disabled :show-score="true" score-template="{value} 分" />
            <span class="meta-divider" />
            <span class="meta-text">{{ product.reviewCount }} 条评价</span>
            <span class="meta-divider" />
            <span class="meta-text">已售 {{ formatSales(product.sales) }}</span>
          </div>

          <!-- 价格区 -->
          <div class="price-block">
            <span class="price-label">促销价</span>
            <span class="price-now">¥{{ product.price.toLocaleString() }}</span>
            <span class="price-ori">¥{{ product.originalPrice.toLocaleString() }}</span>
            <span class="price-save">
              省 ¥{{ (product.originalPrice - product.price).toLocaleString() }}
            </span>
          </div>

          <!-- 规格选择 -->
          <div class="specs-block">
            <div
              v-for="(options, specName) in product.specs"
              :key="specName"
              class="spec-row"
            >
              <span class="spec-name">{{ specName }}</span>
              <div class="spec-options">
                <span
                  v-for="opt in options"
                  :key="opt"
                  :class="['spec-option', { active: selectedSpecs[specName] === opt }]"
                  @click="selectSpec(specName, opt)"
                >{{ opt }}</span>
              </div>
            </div>
          </div>

          <!-- 数量 -->
          <div class="quantity-row">
            <span class="spec-name">数量</span>
            <el-input-number
              v-model="quantity"
              :min="1"
              :max="product.stock"
              size="small"
            />
            <span class="stock-tip">库存 {{ product.stock }} 件</span>
          </div>

          <!-- 操作按钮 -->
          <div class="action-btns">
            <el-button
              type="danger"
              size="large"
              icon="el-icon-shopping-cart-2"
              :disabled="!allSpecsSelected"
              @click="handleAddToCart"
            >加入购物车</el-button>
            <el-button
              type="warning"
              size="large"
              :disabled="!allSpecsSelected"
              @click="handleBuyNow"
            >立即购买</el-button>
          </div>

          <!-- 规格未选提示 -->
          <p v-if="!allSpecsSelected" class="spec-warn">
            <i class="el-icon-warning-outline" /> 请先选择所有规格
          </p>

          <!-- 服务保障 -->
          <div class="service-row">
            <span><i class="el-icon-check" /> 正品保证</span>
            <span><i class="el-icon-check" /> 七天无理由退货</span>
            <span><i class="el-icon-check" /> 极速发货</span>
          </div>
        </div>
      </div>

      <!-- 商品描述 -->
      <div class="desc-block card">
        <h3 class="desc-title">商品详情</h3>
        <p class="desc-text">{{ product.description }}</p>
        <div class="desc-imgs">
          <img
            v-for="(img, i) in product.images"
            :key="i"
            :src="img"
            class="desc-img"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { productApi } from '@/api/product'
import { formatSales } from '@/utils/format'

export default {
  name: 'ProductDetailPage',
  data() {
    return {
      product: null,
      loading: true,
      currentImgIdx: 0,
      selectedSpecs: {},
      quantity: 1
    }
  },
  computed: {
    currentImg() {
      return this.product?.images[this.currentImgIdx] || ''
    },
    allSpecsSelected() {
      if (!this.product) return false
      return Object.keys(this.product.specs).every(k => this.selectedSpecs[k])
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(id) { this.loadProduct(id) }
    }
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addItem' }),
    formatSales,

    async loadProduct(id) {
      this.loading = true
      try {
        const res = await productApi.getDetail(id)
        this.product = res.data
        // 默认选中每个规格的第一项
        const defaultSpecs = {}
        Object.entries(this.product.specs).forEach(([k, opts]) => { defaultSpecs[k] = opts[0] })
        this.selectedSpecs = defaultSpecs
      } catch {
        this.product = null
      } finally {
        this.loading = false
      }
    },

    selectSpec(specName, option) {
      this.$set(this.selectedSpecs, specName, option)
    },

    handleAddToCart() {
      this.addToCart({ product: this.product, selectedSpecs: { ...this.selectedSpecs }, quantity: this.quantity })
      this.$message.success({ message: '已加入购物车', duration: 1500 })
    },

    handleBuyNow() {
      if (!this.$store.getters['user/isLoggedIn']) {
        this.$router.push({ name: 'Login', query: { redirect: '/checkout' } })
        return
      }
      this.addToCart({ product: this.product, selectedSpecs: { ...this.selectedSpecs }, quantity: this.quantity })
      this.$router.push({ name: 'Checkout' })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-detail-page { padding-top: 16px; padding-bottom: 30px; }
.breadcrumb { margin-bottom: 16px; font-size: 13px; color: #666; a { color: #666; text-decoration: none; &:hover { color: #e4393c; } } }

.detail-main {
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
}

// 图片画廊
.gallery { width: 420px; flex-shrink: 0; }
.main-img-wrap {
  width: 420px; height: 420px;
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  .main-img { width: 100%; height: 100%; object-fit: cover; }
}
.thumb-list { display: flex; gap: 8px; }
.thumb {
  width: 68px; height: 68px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s;
  img { width: 100%; height: 100%; object-fit: cover; }
  &.active { border-color: #e4393c; }
  &:hover { border-color: #e4393c; }
}

// 信息区
.detail-info { flex: 1; }
.tags { display: flex; gap: 6px; margin-bottom: 10px; }
.tag { padding: 2px 8px; background: #e4393c; color: #fff; font-size: 11px; border-radius: 2px; }
.product-title { font-size: 20px; font-weight: 700; color: #333; line-height: 1.5; margin-bottom: 12px; }
.meta-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-size: 13px; color: #888; }
.meta-divider { width: 1px; height: 14px; background: #ddd; }
.meta-text { color: #888; }

.price-block {
  display: flex;
  align-items: baseline;
  gap: 10px;
  background: #fff9f9;
  border: 1px solid #ffe0e0;
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 20px;
  .price-label { font-size: 13px; color: #999; }
  .price-now { font-size: 32px; font-weight: 700; color: #e4393c; }
  .price-ori { font-size: 14px; color: #bbb; text-decoration: line-through; }
  .price-save {
    padding: 2px 8px;
    background: #fff3e0;
    color: #e65100;
    font-size: 12px;
    border-radius: 4px;
  }
}

.specs-block { margin-bottom: 20px; }
.spec-row { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 14px; }
.spec-name { width: 60px; font-size: 13px; color: #666; flex-shrink: 0; padding-top: 4px; }
.spec-options { display: flex; flex-wrap: wrap; gap: 8px; }
.spec-option {
  padding: 4px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: #e4393c; color: #e4393c; }
  &.active { border-color: #e4393c; color: #e4393c; background: #fff5f5; font-weight: 600; }
}

.quantity-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  .stock-tip { font-size: 12px; color: #999; }
}

.action-btns {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  ::v-deep .el-button { height: 44px; font-size: 15px; padding: 0 28px; }
}

.spec-warn { font-size: 12px; color: #e6a23c; margin-bottom: 12px; }

.service-row {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #67c23a;
  i { margin-right: 4px; }
}

// 详情描述
.desc-block { margin-top: 16px; }
.desc-title { font-size: 16px; font-weight: 700; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; margin-bottom: 14px; }
.desc-text { font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 20px; }
.desc-imgs { display: flex; gap: 12px; flex-wrap: wrap; }
.desc-img { width: 300px; border-radius: 8px; object-fit: cover; }
</style>
