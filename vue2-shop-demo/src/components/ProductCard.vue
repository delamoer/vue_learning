<template>
  <div class="product-card" @click="goDetail">
    <div class="card-img-wrap">
      <img :src="product.images[0]" :alt="product.name" class="card-img" />
      <span v-for="tag in product.tags" :key="tag" class="img-tag">{{ tag }}</span>
    </div>
    <div class="card-body">
      <p class="card-name">{{ product.name }}</p>
      <div class="card-price-row">
        <span class="price-now">¥{{ product.price.toLocaleString() }}</span>
        <span class="price-ori">¥{{ product.originalPrice.toLocaleString() }}</span>
      </div>
      <div class="card-meta">
        <span class="meta-sales">已售 {{ formatSales(product.sales) }}</span>
        <el-rate
          :value="product.rating"
          disabled
          :show-score="false"
          class="meta-rate"
          score-template="{value}"
          size="mini"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatSales } from '@/utils/format'

export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true }
  },
  methods: {
    formatSales,
    goDetail() {
      this.$router.push({ name: 'ProductDetail', params: { id: this.product.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); transform: translateY(-2px); }
}

.card-img-wrap {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background: #f9f9f9;
  .card-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  &:hover .card-img { transform: scale(1.05); }
  .img-tag {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 2px 6px;
    background: #e4393c;
    color: #fff;
    font-size: 11px;
    border-radius: 2px;
    & + .img-tag { top: 30px; }
  }
}

.card-body { padding: 12px; }

.card-name {
  font-size: 13px;
  color: #333;
  line-height: 1.5;
  height: 2.9em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
}

.card-price-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 6px; }
.price-now { font-size: 18px; font-weight: 700; color: #e4393c; }
.price-ori { font-size: 12px; color: #999; text-decoration: line-through; }

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .meta-sales { font-size: 12px; color: #999; }
  .meta-rate { ::v-deep .el-rate__item { font-size: 12px !important; } }
}
</style>
