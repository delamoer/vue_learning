# vue2-vuex-demo

Vue 2 + Vuex 3 综合实战项目，演示状态管理核心功能。

## 技术栈

- Vue 2.7 + Vue CLI 5
- Vuex 3.6（`namespaced` 模块化）
- Vue Router 3.6（结合 Vuex 做权限控制）
- vuex-persistedstate（状态持久化）

## 项目结构

```
src/
├── main.js
├── App.vue
├── router/index.js        ← 路由配置，全局前置守卫读取 store 权限
├── store/
│   ├── index.js           ← 根 Store，注册模块 + 持久化插件
│   ├── mutation-types.js  ← 所有 Mutation 类型常量
│   └── modules/
│       ├── user.js        ← 用户模块（登录/登出/token）
│       └── cart.js        ← 购物车模块（加购/删除/结算）
├── components/
│   └── NavBar.vue         ← 展示 cartCount（角标） + 登录状态
└── views/
    ├── HomeView.vue       ← State 实时监控面板
    ├── LoginView.vue      ← 登录表单，dispatch 异步 Action
    ├── ShopView.vue       ← 商品列表，加购 dispatch + Getter 查询
    ├── CartView.vue       ← 购物车明细，Getter 总价 + Mutation 操作
    ├── UserView.vue       ← 用户中心，token 持久化展示
    └── NotFoundView.vue
```

## 演示要点

| 知识点 | 体现位置 |
|--------|----------|
| `namespaced: true` 模块 | store/modules/user.js、cart.js |
| Getters 派生计算 | cart.js：count/total/isInCart/qtyOf |
| Mutations 同步变更 | cart.js：ADD_TO_CART/UPDATE_QTY 等 |
| Actions 异步操作 | user.js：login（mock API） |
| Action 读取 rootGetters | cart.js：addToCart 验证登录状态 |
| mapState/mapGetters/mapActions/mapMutations | 各个 View 组件 |
| createNamespacedHelpers | ShopView.vue |
| vuex-persistedstate | store/index.js plugins |
| Vuex + Vue Router 权限 | router/index.js beforeEach |
| dispatch 返回 Promise | LoginView.vue：await dispatch |

## 运行方式

```bash
npm install
npm run serve   # 开发服务器 http://localhost:8081
npm run build   # 生产构建
```

## 账号

| 用户名 | 密码   | 角色           |
|--------|--------|----------------|
| admin  | 123456 | admin + user   |
| user   | 123456 | user           |
