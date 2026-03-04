<template>
  <header class="app-header">
    <div class="header-inner container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <span class="logo-icon">🛒</span>
        <span class="logo-text">VueShop</span>
      </router-link>

      <!-- 搜索框 -->
      <div class="search-bar">
        <el-input
          v-model="keyword"
          placeholder="搜索商品 / 品牌"
          class="search-input"
          @keyup.enter.native="handleSearch"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </div>

      <!-- 右侧操作区 -->
      <div class="header-actions">
        <!-- 购物车 -->
        <router-link to="/cart" class="action-item cart-btn">
          <el-badge :value="cartCount" :hidden="cartCount === 0" class="cart-badge">
            <i class="el-icon-shopping-cart-2" />
          </el-badge>
          <span class="action-label">购物车</span>
        </router-link>

        <!-- 用户 -->
        <div class="action-item user-area">
          <template v-if="isLoggedIn">
            <el-dropdown @command="handleUserCmd">
              <span class="user-trigger">
                <i class="el-icon-user-solid" />
                <span class="action-label">{{ nickname }}</span>
                <i class="el-icon-arrow-down" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <router-link v-else to="/login" class="login-link">
            <i class="el-icon-user" />
            <span class="action-label">登录</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 分类导航栏 -->
    <nav class="category-nav">
      <div class="container nav-inner">
        <router-link to="/products" class="nav-item all-cat">
          <i class="el-icon-menu" /> 全部分类
        </router-link>
        <router-link
          v-for="cat in categories"
          :key="cat.id"
          :to="{ name: 'ProductList', query: { categoryId: cat.id } }"
          class="nav-item"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          {{ cat.name }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { productApi } from '@/api/product'

export default {
  name: 'AppHeader',
  data() {
    return {
      keyword: '',
      categories: []
    }
  },
  computed: {
    ...mapGetters({
      cartCount: 'cart/totalCount',
      isLoggedIn: 'user/isLoggedIn',
      nickname: 'user/nickname'
    })
  },
  created() {
    this.loadCategories()
  },
  methods: {
    ...mapActions({ logout: 'user/logout' }),
    async loadCategories() {
      const res = await productApi.getCategories()
      this.categories = res.data
    },
    handleSearch() {
      if (this.keyword.trim()) {
        this.$router.push({ name: 'ProductList', query: { keyword: this.keyword.trim() } })
      }
    },
    handleUserCmd(cmd) {
      if (cmd === 'logout') {
        this.logout()
        this.$message.success('已退出登录')
        if (this.$route.meta.requiresAuth) this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-inner {
  display: flex;
  align-items: center;
  height: 56px;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  .logo-icon { font-size: 22px; margin-right: 6px; }
  .logo-text { font-size: 20px; font-weight: 700; color: #e4393c; letter-spacing: 1px; }
}

.search-bar {
  flex: 1;
  max-width: 500px;
  .search-input { width: 100%; }
  ::v-deep .el-input__inner { border-radius: 4px 0 0 4px; }
  ::v-deep .el-input-group__append {
    background: #e4393c;
    border-color: #e4393c;
    color: #fff;
    width: 44px;
    text-align: center;
    cursor: pointer;
    &:hover { background: #c62828; }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  font-size: 12px;
  transition: color 0.2s;
  &:hover, &.router-link-active { color: #e4393c; }
  i { font-size: 20px; margin-bottom: 2px; }
  .action-label { font-size: 12px; }
}

.cart-btn {
  .cart-badge {
    ::v-deep .el-badge__content { background: #e4393c; }
  }
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #333;
  cursor: pointer;
  font-size: 13px;
  &:hover { color: #e4393c; }
  i { font-size: 18px; }
}

.login-link {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: #333;
  font-size: 13px;
  &:hover { color: #e4393c; }
  i { font-size: 18px; }
}

// 分类导航栏
.category-nav {
  background: #f5f5f5;
  border-top: 1px solid #e8e8e8;
}

.nav-inner {
  display: flex;
  align-items: center;
  height: 36px;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  height: 36px;
  font-size: 13px;
  color: #555;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s, background 0.2s;
  border-radius: 3px;
  &:hover { color: #e4393c; background: #fff; }
  &.router-link-exact-active { color: #e4393c; font-weight: 600; }
  .cat-icon { font-size: 14px; }
}

.all-cat {
  color: #fff;
  background: #e4393c;
  font-weight: 600;
  &:hover { background: #c62828; color: #fff; }
}
</style>
