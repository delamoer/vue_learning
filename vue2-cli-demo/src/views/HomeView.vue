<template>
  <div class="home-view">
    <div class="hero">
      <h1 class="hero-title">🎉 27_Vue CLI 深入与工程化</h1>
      <p class="hero-sub">通过本项目可以学习 Vue CLI 工程化的核心能力</p>
    </div>

    <div class="grid-2 mt-md">
      <div
        v-for="feature in features"
        :key="feature.path"
        class="feature-card card"
        @click="$router.push(feature.path)"
      >
        <div class="feature-icon">{{ feature.icon }}</div>
        <div class="feature-title">{{ feature.title }}</div>
        <div class="feature-desc">{{ feature.desc }}</div>
        <div class="feature-tags">
          <span v-for="tag in feature.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <div class="card mt-md">
      <h2>📋 项目技术栈</h2>
      <div class="stack-list">
        <div v-for="item in stack" :key="item.name" class="stack-item">
          <span class="stack-name">{{ item.name }}</span>
          <span class="stack-version">{{ item.version }}</span>
          <span class="stack-role">{{ item.role }}</span>
        </div>
      </div>
    </div>

    <div class="card mt-md">
      <h2>📁 项目目录结构</h2>
      <div class="code-block">
        <pre class="tree-text">{{ treeText }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      features: [
        {
          icon: '🔑',
          title: '环境变量与模式',
          desc: '.env 文件、VUE_APP_ 前缀、多环境构建',
          path: '/env',
          tags: ['.env', 'NODE_ENV', 'process.env']
        },
        {
          icon: '🎨',
          title: 'Sass 样式系统',
          desc: '全局变量注入、mixin 复用、scoped 深度穿透',
          path: '/style',
          tags: ['scss', 'variables', 'mixin', '::v-deep']
        },
        {
          icon: '🚀',
          title: '性能优化',
          desc: '路由懒加载、代码分割、打包分析',
          path: '/perf',
          tags: ['lazy-load', 'splitChunks', 'CDN', 'Gzip']
        },
        {
          icon: '📐',
          title: '项目结构',
          desc: '企业级目录规范、API 层封装、组件分层',
          path: '/home',
          tags: ['views/', 'api/', 'utils/', 'components/']
        }
      ],
      stack: [
        { name: 'Vue', version: '^2.7.14', role: '核心框架' },
        { name: 'Vue Router', version: '^3.6.5', role: '路由管理' },
        { name: 'Vue CLI', version: '~5.0.8', role: '脚手架和构建工具' },
        { name: 'Sass', version: '^1.57.1', role: 'CSS 预处理器' },
        { name: 'Babel', version: 'ESNext', role: 'ES6+ 转译' },
        { name: 'ESLint', version: '^7', role: '代码质量检查' }
      ],
      treeText: `vue2-cli-demo/
├── public/             ← 静态资源（不经 Webpack 处理）
├── src/
│   ├── main.js         ← 应用入口
│   ├── App.vue         ← 根组件（路由容器）
│   ├── router/         ← 路由配置（路由懒加载）
│   ├── components/
│   │   └── layout/     ← AppHeader 布局组件
│   ├── views/          ← 页面级组件
│   ├── styles/         ← 全局样式
│   │   ├── _variables.scss  ← 全局变量（自动注入）
│   │   ├── _mixins.scss     ← 全局 mixin（自动注入）
│   │   ├── _reset.scss      ← 样式重置
│   │   ├── _base.scss       ← 全局 UI 类
│   │   └── index.scss       ← 入口导出
│   └── utils/
│       └── logger.js   ← 环境感知日志工具
├── .env                ← 通用环境变量
├── .env.development    ← 开发环境
├── .env.production     ← 生产环境
├── .env.staging        ← 预发环境
├── .eslintrc.js        ← ESLint 配置
├── babel.config.js
└── vue.config.js       ← Sass 注入 + devServer + build 优化`
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  padding: $spacing-xl 0 $spacing-lg;

  .hero-title {
    font-size: $font-size-xxl;
    color: $primary;
    margin-bottom: $spacing-sm;
  }

  .hero-sub {
    color: $text-muted;
    font-size: $font-size-lg;
  }
}

.feature-card {
  cursor: pointer;
  transition: $transition-normal;
  user-select: none;

  &:hover {
    border-color: $primary;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  .feature-icon { font-size: 32px; margin-bottom: $spacing-sm; }
  .feature-title { font-size: $font-size-lg; font-weight: 600; color: #e6edf3; margin-bottom: $spacing-xs; }
  .feature-desc  { color: $text-muted; font-size: $font-size-sm; margin-bottom: $spacing-sm; }

  .feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;

    .tag {
      background: rgba($primary, 0.12);
      color: $primary;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: $font-size-xs;
      font-family: 'Consolas', monospace;
    }
  }
}

h2 {
  font-size: $font-size-lg;
  color: $primary;
  margin-bottom: $spacing-md;
}

.stack-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.stack-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-xs 0;
  border-bottom: 1px solid $border-color;
  font-size: $font-size-sm;

  &:last-child { border-bottom: none; }

  .stack-name    { color: $primary;    font-weight: 600; width: 120px; flex-shrink: 0; }
  .stack-version { color: $text-muted; font-family: 'Consolas', monospace; width: 100px; flex-shrink: 0; }
  .stack-role    { color: #e6edf3; }
}

.tree-text {
  color: #e6edf3;
  font-family: 'Consolas', monospace;
  font-size: $font-size-sm;
  line-height: 1.7;
  white-space: pre;
}
</style>
