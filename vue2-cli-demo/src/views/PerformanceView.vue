<template>
  <div class="perf-view">
    <h1>⚡ 打包优化与性能</h1>
    <p class="subtitle">路由懒加载、bundle 分析、CDN 外链、splitChunks 分包策略</p>

    <!-- 路由懒加载 -->
    <div class="card mt-md">
      <h2>🦥 路由懒加载（import()）</h2>
      <p class="tip">
        使用动态 import + webpackChunkName 魔法注释，路由切换时按需加载对应 chunk
      </p>
      <div class="code-block">
        <pre>{{ lazyCode }}</pre>
      </div>
      <div class="chunk-table-wrap mt-sm">
        <h3>生成的 chunk 文件（npm run build）</h3>
        <table class="perf-table">
          <thead>
            <tr>
              <th>chunk 文件名</th>
              <th>包含路由</th>
              <th>加载时机</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="chunk in chunks" :key="chunk.name">
              <td class="font-mono">{{ chunk.name }}</td>
              <td>{{ chunk.routes }}</td>
              <td><span class="chunk-badge">{{ chunk.timing }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- splitChunks -->
    <div class="card mt-md">
      <h2>✂️ splitChunks 分包策略</h2>
      <div class="code-block">
        <pre>{{ splitChunksCode }}</pre>
      </div>
      <div class="mt-sm grid-2">
        <div v-for="pkg in bundleItems" :key="pkg.name" class="bundle-item">
          <div class="bundle-bar-wrap">
            <div class="bundle-bar" :style="{ width: pkg.pct + '%', background: pkg.color }"></div>
          </div>
          <div class="bundle-meta">
            <span class="bundle-name font-mono">{{ pkg.name }}</span>
            <span class="bundle-size">≈ {{ pkg.size }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CDN 外链 -->
    <div class="card mt-md">
      <h2>🌐 CDN 外链（externals）</h2>
      <div class="code-block">
        <pre>{{ cdnCode }}</pre>
      </div>
      <div class="cdn-compare mt-sm">
        <div class="cdn-box">
          <div class="cdn-label cdn-before">打包前（2MB+）</div>
          <div class="bar-full"></div>
          <span>vue.js + vue-router + vuex 全部打入 bundle</span>
        </div>
        <div class="cdn-box">
          <div class="cdn-label cdn-after">配置 CDN 后（~120KB）</div>
          <div class="bar-slim"></div>
          <span>只打包业务代码，框架从 CDN 引入</span>
        </div>
      </div>
    </div>

    <!-- 优化清单 -->
    <div class="card mt-md">
      <h2>✅ 性能优化清单</h2>
      <div class="checklist">
        <div v-for="item in checklist" :key="item.title" class="check-item" :class="{ done: item.done }">
          <span class="check-icon">{{ item.done ? '✅' : '⬜' }}</span>
          <div>
            <div class="check-title">{{ item.title }}</div>
            <div class="check-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceView',
  data() {
    return {
      lazyCode: `// src/router/index.js
const routes = [
  {
    path: '/home',
    // webpackChunkName 指定输出 chunk 名称
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView')
  },
  {
    path: '/env',
    // 合并到同一 chunk（按功能分组）
    component: () => import(/* webpackChunkName: "features" */ '@/views/EnvView')
  },
  {
    path: '/style',
    component: () => import(/* webpackChunkName: "features" */ '@/views/StyleView')
  }
  // 三个路由用同一 chunkName → 合并为一个 features.js
]`,
      splitChunksCode: `// vue.config.js
chainWebpack(config) {
  config.optimization.splitChunks({
    chunks: 'all',
    cacheGroups: {
      // Vue 框架单独打包
      vue: {
        name: 'chunk-vue',
        test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
        priority: 20
      },
      // Element UI 单独打包（如果使用）
      elementUI: {
        name: 'chunk-element',
        test: /[\\/]node_modules[\\/]element-ui[\\/]/,
        priority: 19
      },
      // 其余 node_modules 合并
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: 10
      }
    }
  })
}`,
      cdnCode: `// vue.config.js - 生产环境使用 CDN
const isProd = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  configureWebpack: {
    externals: isProd ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex'
    } : {}
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].cdn = isProd ? {
        js: [
          'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js',
          'https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js'
        ]
      } : { js: [] }
      return args
    })
  }
})

// public/index.html - 循环注入 CDN script 标签
// <% for (var i in htmlWebpackPlugin.options.cdn.js) { %>
//   在 HTML 中通过 EJS 循环注入 jsdelivr 的 script 标签
// <% } %>`,
      chunks: [
        { name: 'app.js',              routes: '—（入口）',             timing: '首屏同步加载' },
        { name: 'chunk-vendors.js',    routes: '所有 node_modules',     timing: '首屏同步加载' },
        { name: 'chunk-home.js',       routes: '/home',                 timing: '切换到首页时' },
        { name: 'chunk-features.js',   routes: '/env /style /perf',     timing: '切换到任一功能页时' },
        { name: 'chunk-err.js',        routes: '404 NotFound',          timing: '错误路由时' }
      ],
      bundleItems: [
        { name: 'chunk-vendors.js',  size: '~90KB', pct: 90, color: '#79c0ff' },
        { name: 'chunk-features.js', size: '~30KB', pct: 30, color: '#42b983' },
        { name: 'chunk-home.js',     size: '~12KB', pct: 12, color: '#e3b341' },
        { name: 'app.js',            size: '~8KB',  pct:  8, color: '#f85149' },
        { name: 'chunk-err.js',      size: '~3KB',  pct:  3, color: '#bc8cff' }
      ],
      checklist: [
        { title: '路由懒加载',           desc: 'import() + webpackChunkName 按路由分包',  done: true  },
        { title: 'productionSourceMap', desc: '生产环境关闭 source-map 减少文件体积',       done: true  },
        { title: 'console 自动清除',     desc: 'terser drop_console: true（生产构建）',   done: true  },
        { title: '全局样式 additionalData', desc: 'variables + mixins 自动注入无需手动import', done: true  },
        { title: 'splitChunks 分包',     desc: 'vue 框架 / 业务代码独立 chunk，利用浏览器缓存', done: false },
        { title: 'CDN 外链',             desc: '框架包走 CDN，大幅减少打包体积',               done: false },
        { title: 'Gzip 预压缩',          desc: 'compression-webpack-plugin，Nginx 直接服务', done: false },
        { title: '图片 Base64',          desc: 'url-loader limit 设置小图转 Base64',         done: false },
        { title: 'ESLint + lint-staged', desc: 'commit 前强制 lint 检查',                    done: false }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
h1 { font-size: $font-size-xxl; color: $primary; margin-bottom: $spacing-xs; }
.subtitle { color: $text-muted; margin-bottom: $spacing-md; }
h2 { color: $info; font-size: $font-size-lg; margin-bottom: $spacing-sm; }
h3 { font-size: $font-size-md; color: $text-base; margin-bottom: $spacing-xs; font-weight: 600; }

.perf-table {
  width: 100%;
  border-collapse: collapse;
  font-size: $font-size-sm;

  th {
    background: rgba(255,255,255,0.04);
    border: 1px solid $border-color;
    padding: 8px 12px;
    color: $info;
    text-align: left;
  }

  td {
    border: 1px solid $border-color;
    padding: 8px 12px;
    color: $text-muted;
  }

  tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
}

.chunk-badge {
  background: rgba($primary, 0.12);
  color: $primary;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: $font-size-xs;
}

.bundle-item {
  margin-bottom: $spacing-sm;

  .bundle-bar-wrap {
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    height: 8px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .bundle-bar {
    height: 100%;
    border-radius: 3px;
    transition: width $transition-normal;
  }

  .bundle-meta {
    @include flex-vcenter;
    justify-content: space-between;
    .bundle-name { font-size: $font-size-sm; color: $info; }
    .bundle-size  { font-size: $font-size-xs; color: $text-muted; }
  }
}

.cdn-compare {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.cdn-box {
  font-size: $font-size-sm;
  color: $text-muted;

  .cdn-label {
    font-weight: 600;
    margin-bottom: 4px;
    &.cdn-before { color: $danger; }
    &.cdn-after  { color: $success; }
  }

  .bar-full {
    height: 12px;
    width: 100%;
    background: linear-gradient(90deg, $danger 0%, rgba($danger, 0.4) 100%);
    border-radius: 3px;
    margin-bottom: 4px;
  }

  .bar-slim {
    height: 12px;
    width: 15%;
    background: $success;
    border-radius: 3px;
    margin-bottom: 4px;
  }
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.check-item {
  @include flex-vcenter;
  gap: $spacing-sm;
  padding: $spacing-sm;
  border-radius: $radius-sm;
  border: 1px solid $border-color;
  background: rgba(255,255,255,0.02);

  &.done { border-color: rgba($primary, 0.3); background: rgba($primary, 0.04); }

  .check-icon { font-size: $font-size-md; flex-shrink: 0; }
  .check-title { font-size: $font-size-sm; color: $text-base; font-weight: 600; margin-bottom: 2px; }
  .check-desc  { font-size: $font-size-xs; color: $text-muted; }
}
</style>
