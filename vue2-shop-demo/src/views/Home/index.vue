<template>
  <div class="home-page">
    <!-- Banner 轮播 -->
    <section class="banner-section">
      <el-carousel height="380px" :interval="4000" arrow="always">
        <el-carousel-item v-for="banner in banners" :key="banner.id">
          <div class="banner-item" :style="{ background: banner.bg }">
            <div class="banner-content">
              <h2>{{ banner.title }}</h2>
              <p>{{ banner.subtitle }}</p>
              <el-button type="danger" size="medium" @click="$router.push(banner.link)">
                立即选购
              </el-button>
            </div>
            <img :src="banner.img" class="banner-img" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <!-- 分类导航卡片 -->
    <section class="category-section container">
      <div class="category-cards">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="cat-card"
          @click="$router.push({ name: 'ProductList', query: { categoryId: cat.id } })"
        >
          <span class="cat-card-icon">{{ cat.icon }}</span>
          <span class="cat-card-name">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <!-- 热销商品 -->
    <section class="hot-section container">
      <h2 class="section-title">🔥 热销榜单</h2>
      <div v-if="loadingHot" class="loading-wrap">
        <el-skeleton :rows="3" animated />
      </div>
      <div v-else class="product-grid">
        <ProductCard v-for="p in hotProducts" :key="p.id" :product="p" />
      </div>
      <div class="view-more">
        <el-button plain @click="$router.push({ name: 'ProductList', query: { sortBy: 'sales' } })">
          查看更多热销商品 <i class="el-icon-arrow-right" />
        </el-button>
      </div>
    </section>

    <!-- 推荐商品 -->
    <section class="recommend-section container">
      <h2 class="section-title">⭐ 为您推荐</h2>
      <div class="product-grid">
        <ProductCard v-for="p in recommended" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { productApi } from '@/api/product'

// Banner 数据（实际项目中来自接口）
const BANNERS = [
  {
    id: 1,
    title: '手机数码盛典',
    subtitle: '旗舰新品限时优惠，最高立减500元',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    img: 'https://picsum.photos/seed/banner1/500/300',
    link: { name: 'ProductList', query: { categoryId: 1 } }
  },
  {
    id: 2,
    title: '春季穿搭新风尚',
    subtitle: '全场服装低至5折，新款上新每周更新',
    bg: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
    img: 'https://picsum.photos/seed/banner2/500/300',
    link: { name: 'ProductList', query: { categoryId: 2 } }
  },
  {
    id: 3,
    title: '家居品质生活节',
    subtitle: '精选家居好物，让家更温馨',
    bg: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
    img: 'https://picsum.photos/seed/banner3/500/300',
    link: { name: 'ProductList', query: { categoryId: 3 } }
  }
]

export default {
  name: 'HomePage',
  components: { ProductCard },
  data() {
    return {
      banners: BANNERS,
      categories: [],
      hotProducts: [],
      recommended: [],
      loadingHot: true
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const [catsRes, hotRes, recRes] = await Promise.all([
        productApi.getCategories(),
        productApi.getHotSales(),
        productApi.getRecommended()
      ])
      this.categories = catsRes.data
      this.hotProducts = hotRes.data
      this.recommended = recRes.data
      this.loadingHot = false
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page { padding-bottom: 20px; }

// Banner
.banner-section { margin-bottom: 24px; }
.banner-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 380px;
  padding: 0 10%;
}
.banner-content {
  h2 { font-size: 32px; color: #fff; margin-bottom: 12px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
  p { font-size: 16px; color: rgba(255,255,255,0.85); margin-bottom: 24px; }
}
.banner-img {
  width: 360px;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

// 分类卡片
.category-section { margin-bottom: 32px; padding-top: 20px; }
.category-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); transform: translateY(-3px); }
  .cat-card-icon { font-size: 36px; }
  .cat-card-name { font-size: 14px; font-weight: 600; color: #333; }
}

// 商品区
.hot-section, .recommend-section { margin-bottom: 40px; }
.loading-wrap { padding: 20px 0; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.view-more { text-align: center; margin-top: 20px; }
</style>
