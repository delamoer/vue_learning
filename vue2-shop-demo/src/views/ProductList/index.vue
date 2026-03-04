<template>
  <div class="product-list-page container">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <router-link to="/">首页</router-link> &gt;
      <span>{{ currentCatName || '全部商品' }}</span>
    </div>

    <div class="page-layout">
      <!-- 左侧分类侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <h4 class="sidebar-title">商品分类</h4>
          <ul class="cat-list">
            <li
              :class="['cat-item', { active: !filterParams.categoryId }]"
              @click="selectCategory(null)"
            >全部商品</li>
            <li
              v-for="cat in categories"
              :key="cat.id"
              :class="['cat-item', { active: filterParams.categoryId === cat.id }]"
              @click="selectCategory(cat.id)"
            >
              <span>{{ cat.icon }} {{ cat.name }}</span>
              <!-- 子分类 -->
              <template v-if="filterParams.categoryId === cat.id">
                <ul class="sub-cat-list">
                  <li
                    v-for="sub in cat.sub"
                    :key="sub"
                    :class="['sub-item', { active: filterParams.subCategory === sub }]"
                    @click.stop="selectSubCategory(sub)"
                  >{{ sub }}</li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
      </aside>

      <!-- 右侧内容区 -->
      <main class="list-main">
        <!-- 筛选/排序工具栏 -->
        <div class="toolbar">
          <div class="toolbar-left">
            <!-- 搜索关键词回显 -->
            <span v-if="filterParams.keyword" class="keyword-tag">
              搜索：{{ filterParams.keyword }}
              <i class="el-icon-close" @click="clearKeyword" />
            </span>
            <span class="result-count">共 <strong>{{ total }}</strong> 件商品</span>
          </div>
          <div class="toolbar-right sort-btns">
            <span
              v-for="opt in sortOptions"
              :key="opt.value"
              :class="['sort-btn', { active: filterParams.sortBy === opt.value }]"
              @click="setSort(opt.value)"
            >{{ opt.label }}</span>
          </div>
        </div>

        <!-- 骨架屏 loading -->
        <div v-if="loading">
          <el-skeleton :rows="6" animated />
        </div>

        <!-- 空状态 -->
        <div v-else-if="!loading && products.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>未找到相关商品，换个关键词试试</p>
        </div>

        <!-- 商品列表 -->
        <transition-group v-else name="fade" tag="div" class="product-grid">
          <ProductCard
            v-for="p in products"
            :key="p.id"
            :product="p"
          />
        </transition-group>

        <!-- 分页 -->
        <div v-if="total > filterParams.pageSize" class="pagination-wrap">
          <el-pagination
            background
            :current-page="filterParams.page"
            :page-size="filterParams.pageSize"
            :total="total"
            :page-sizes="[8, 16, 24]"
            layout="total, sizes, prev, pager, next"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { productApi } from '@/api/product'

export default {
  name: 'ProductListPage',
  components: { ProductCard },

  data() {
    return {
      categories: [],
      products: [],
      total: 0,
      loading: true,
      filterParams: {
        categoryId: null,
        subCategory: null,
        keyword: '',
        sortBy: 'default',
        page: 1,
        pageSize: 8
      },
      sortOptions: [
        { label: '综合排序', value: 'default' },
        { label: '销量最高', value: 'sales' },
        { label: '好评优先', value: 'rating' },
        { label: '价格升序', value: 'price-asc' },
        { label: '价格降序', value: 'price-desc' }
      ]
    }
  },

  computed: {
    currentCatName() {
      if (!this.filterParams.categoryId) return ''
      const cat = this.categories.find(c => c.id === Number(this.filterParams.categoryId))
      return cat ? cat.name : ''
    }
  },

  // 监听路由 query 变化（如头部搜索、分类导航点击）
  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        this.filterParams.categoryId = query.categoryId ? Number(query.categoryId) : null
        this.filterParams.keyword = query.keyword || ''
        this.filterParams.sortBy = query.sortBy || 'default'
        this.filterParams.subCategory = null
        this.filterParams.page = 1
        this.loadProducts()
      }
    }
  },

  created() {
    this.loadCategories()
  },

  methods: {
    async loadCategories() {
      const res = await productApi.getCategories()
      this.categories = res.data
    },

    async loadProducts() {
      this.loading = true
      try {
        const res = await productApi.getList(this.filterParams)
        this.products = res.data
        this.total = res.total
      } finally {
        this.loading = false
      }
    },

    selectCategory(id) {
      this.filterParams.categoryId = id
      this.filterParams.subCategory = null
      this.filterParams.page = 1
      this.loadProducts()
    },

    selectSubCategory(sub) {
      this.filterParams.subCategory = this.filterParams.subCategory === sub ? null : sub
      this.filterParams.page = 1
      this.loadProducts()
    },

    setSort(value) {
      this.filterParams.sortBy = value
      this.filterParams.page = 1
      this.loadProducts()
    },

    clearKeyword() {
      this.filterParams.keyword = ''
      this.filterParams.page = 1
      this.loadProducts()
    },

    handlePageChange(page) {
      this.filterParams.page = page
      this.loadProducts()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    handleSizeChange(size) {
      this.filterParams.pageSize = size
      this.filterParams.page = 1
      this.loadProducts()
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list-page { padding-top: 16px; padding-bottom: 30px; }
.breadcrumb { margin-bottom: 16px; font-size: 13px; color: #666; a { color: #666; text-decoration: none; &:hover { color: #e4393c; } } }
.page-layout { display: flex; gap: 20px; align-items: flex-start; }

// 侧边栏
.sidebar {
  width: 180px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.sidebar-title { padding: 14px 16px 10px; font-size: 14px; font-weight: 700; border-bottom: 1px solid #f0f0f0; }
.cat-list { list-style: none; padding: 6px 0; }
.cat-item {
  padding: 10px 16px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  &:hover { color: #e4393c; background: #fff5f5; }
  &.active { color: #e4393c; font-weight: 600; background: #fff5f5; border-left: 3px solid #e4393c; }
}
.sub-cat-list { list-style: none; margin-top: 6px; margin-left: 8px; }
.sub-item {
  padding: 6px 10px;
  font-size: 12px;
  color: #777;
  cursor: pointer;
  border-radius: 4px;
  &:hover { color: #e4393c; }
  &.active { color: #e4393c; font-weight: 600; }
}

// 主内容
.list-main { flex: 1; min-width: 0; }
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.toolbar-left { display: flex; align-items: center; gap: 10px; }
.keyword-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #fff5f5;
  border: 1px solid #e4393c;
  color: #e4393c;
  border-radius: 4px;
  font-size: 13px;
  i { cursor: pointer; &:hover { font-weight: 700; } }
}
.result-count { font-size: 13px; color: #999; strong { color: #e4393c; } }
.sort-btns { display: flex; gap: 4px; }
.sort-btn {
  padding: 4px 10px;
  font-size: 12px;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover { color: #e4393c; border-color: #e4393c; }
  &.active { color: #fff; background: #e4393c; border-color: #e4393c; }
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}
.pagination-wrap { display: flex; justify-content: center; padding-top: 10px; }
.empty-state { text-align: center; padding: 80px 0; color: #999; .empty-icon { font-size: 60px; } p { margin-top: 12px; font-size: 15px; } }
</style>
