# vue3-vite-demo

与 `vue2-sfc-demo` 功能完全相同的对照版本。  
用于对比 **Vue CLI（Webpack）** 和 **Vite** 两种工具链在项目结构和开发体验上的差异。

## 运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览生产包
npm run preview
```

## 与 vue2-sfc-demo 的对比

| 对比项 | vue2-sfc-demo（Webpack） | vue3-vite-demo（Vite） |
|--------|--------------------------|------------------------|
| Vue 版本 | Vue 2 | Vue 3 |
| 构建工具 | Webpack（Vue CLI 封装） | Vite |
| JS 转换 | Babel | esbuild（内置） |
| 配置文件 | `vue.config.js` + `babel.config.js` | `vite.config.js` |
| index.html 位置 | `public/index.html` | 根目录 `index.html` |
| script 注入方式 | HtmlWebpackPlugin 自动注入 | `<script type="module">` 直接写 |
| 启动命令 | `npm run serve` | `npm run dev` |
| 默认端口 | 8080 | 5173 |
| 冷启动速度 | 慢（全量编译） | 极快（按需编译） |

## Vue 2 → Vue 3 的代码差异

### main.js

```js
// Vue 2（vue2-sfc-demo）
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
new Vue({ render: h => h(App) }).$mount('#app')

// Vue 3（本项目）
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

### 组件 emits 声明

```vue
<!-- Vue 2：不需要声明 emits -->
<!-- Vue 3：建议显式声明，帮助 IDE 提示和文档生成 -->
export default {
  emits: ['greet'],  // ← Vue 3 新增，Vue 2 中不需要
  methods: {
    handleClick() {
      this.$emit('greet', this.username)  // 用法完全一样
    }
  }
}
```

### 其余代码：完全一致

Options API（data、methods、props、computed、watch、生命周期钩子）在 Vue 3 中完全兼容，无需修改。

## 注意事项

- 本项目需要在**无 AppLocker 限制**的环境中运行（Vite 依赖 `esbuild.exe`）
- Node.js 建议 18+ 版本
