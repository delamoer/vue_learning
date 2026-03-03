// store/modules/cart.js — 购物车模块（命名空间：cart）
import * as types from '../mutation-types'

export default {
  namespaced: true,

  state: () => ({
    items: []
    // { id, name, price, image, qty }
  }),

  getters: {
    // 购物车件数（用于导航栏角标）
    count: state => state.items.reduce((n, i) => n + i.qty, 0),

    // 购物车总价
    total: state => state.items.reduce((s, i) => s + i.price * i.qty, 0),

    // 格式化总价（带两位小数）
    totalFormatted: (state, getters) =>
      '¥' + getters.total.toFixed(2),

    // 某商品是否已在购物车（返回函数，带参数查询）
    isInCart: state => id => state.items.some(i => i.id === id),

    // 某商品数量
    qtyOf: state => id => {
      const item = state.items.find(i => i.id === id)
      return item ? item.qty : 0
    }
  },

  mutations: {
    // 加入购物车（已有则 +1）
    [types.ADD_TO_CART](state, product) {
      const found = state.items.find(i => i.id === product.id)
      if (found) {
        found.qty++
      } else {
        state.items.push({ ...product, qty: 1 })
      }
    },

    // 从购物车移除
    [types.REMOVE_FROM_CART](state, productId) {
      state.items = state.items.filter(i => i.id !== productId)
    },

    // 更新数量
    [types.UPDATE_QTY](state, { id, qty }) {
      const item = state.items.find(i => i.id === id)
      if (item) {
        if (qty <= 0) {
          state.items = state.items.filter(i => i.id !== id)
        } else {
          item.qty = qty
        }
      }
    },

    // 清空购物车
    [types.CLEAR_CART](state) {
      state.items = []
    }
  },

  actions: {
    // 加入购物车（封装业务逻辑，组件只需 dispatch）
    addToCart({ commit, rootGetters }, product) {
      const isLoggedIn = rootGetters['user/isLoggedIn']
      if (!isLoggedIn) {
        throw new Error('请先登录')
      }
      commit(types.ADD_TO_CART, product)
    },

    removeFromCart({ commit }, productId) {
      commit(types.REMOVE_FROM_CART, productId)
    },

    updateQty({ commit }, payload) {
      commit(types.UPDATE_QTY, payload)
    },

    // 结算（模拟）
    async checkout({ commit, state, rootState }) {
      const userId = rootState.user.id
      if (!userId) throw new Error('请先登录')
      if (state.items.length === 0) throw new Error('购物车为空')

      // 模拟 API 请求
      await new Promise(r => setTimeout(r, 1000))
      commit(types.CLEAR_CART)
      return { orderId: 'ORD-' + Date.now() }
    }
  }
}
