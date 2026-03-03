# vue2-cli-demo

> Vue CLI 工程化实战 Demo（第 27 章配套项目）

## 知识点覆盖

| 模块 | 内容 |
|------|------|
| Vue CLI 5 | vue.config.js 完整配置（端口/proxy/chainWebpack/CSS） |
| 环境变量 | .env 多文件 + VUE_APP_* 前缀 + 多模式（dev/staging/prod） |
| CSS 预处理器 | Sass + additionalData 自动注入全局变量/mixin |
| 路由懒加载 | import() + webpackChunkName 魔法注释 |
| 性能优化 | productionSourceMap / terser drop_console / splitChunks 分包 |
| 项目规范 | ESLint + babel-eslint / 目录结构 / 命名规范 |

## 目录结构

```
vue2-cli-demo/
├── public/
│   └── index.html          # HTML 模板（动态 title）
├── src/
│   ├── components/
│   │   └── layout/
│   │       └── AppHeader.vue  # 导航栏（环境徽标）
│   ├── router/
│   │   └── index.js           # 路由（懒加载 + beforeEach）
│   ├── styles/
│   │   ├── variables.scss     # 所有 CSS 变量（纯声明）
│   │   ├── mixins.scss        # 所有 mixin（纯声明）
│   │   ├── reset.scss
│   │   ├── transition.scss    # 路由切换动画
│   │   ├── base.scss          # 全局工具类
│   │   └── index.scss         # 入口（import reset/base/transition）
│   ├── utils/
│   │   └── logger.js          # 日志工具（受 LOG_LEVEL 控制）
│   ├── views/
│   │   ├── HomeView.vue       # 首页总览
│   │   ├── EnvView.vue        # 环境变量演示
│   │   ├── StyleView.vue      # 样式系统演示
│   │   ├── PerformanceView.vue # 性能优化演示
│   │   └── NotFoundView.vue   # 404 页面
│   ├── App.vue                # 根组件（页面切换动画）
│   └── main.js
├── .env                       # 公共变量（所有环境）
├── .env.development           # 开发环境
├── .env.production            # 生产环境
├── .env.staging               # 预发环境（--mode staging）
├── vue.config.js              # Vue CLI 核心配置
├── babel.config.js
└── .eslintrc.js
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发环境（port: 8083）
npm run serve

# 预发环境
npm run serve -- --mode staging

# 生产构建
npm run build

# 构建 + 包体积分析报告
npm run build -- --report

# 代码检查
npm run lint
```

## 访问地址

- 开发环境：<http://localhost:8083/>
- 首页：<http://localhost:8083/home>
- 环境变量演示：<http://localhost:8083/env>
- 样式演示：<http://localhost:8083/style>
- 性能优化演示：<http://localhost:8083/perf>

## 核心配置说明

### additionalData 自动注入

```js
// vue.config.js
css: {
  loaderOptions: {
    sass: {
      // 每个 <style lang="scss"> 自动注入变量和 mixin
      // 无需在每个组件中手动 @import
      additionalData: `
        @import "@/styles/variables.scss";
        @import "@/styles/mixins.scss";
      `
    }
  }
}
```

### 多环境变量读取

```js
// 代码中读取
process.env.VUE_APP_API_BASE_URL
process.env.NODE_ENV

// 只有 VUE_APP_ 前缀的变量才会暴露给浏览器
```
