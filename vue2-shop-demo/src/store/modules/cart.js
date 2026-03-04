/**
 * Vuex 购物车模块
 *
 * 知识点：
 * - state 中的购物车以对象形式存储（key = productId_specKey），方便查找
 * - getters 负责衍生计算（总数量、总金额、选中商品）
 * - mutations 同步修改
 * - actions 处理持久化等副作用
 *
 * cartItem 结构：
 *   { id, name, price, image, specs, quantity, selected }
 */
import { storage } from '@/utils/storage'

// 生成购物车项唯一 key
function makeKey(productId, specKey) {
  return `${productId}_${specKey}`
}

export default {
  namespaced: true,

  state: {
    // 数组形式，每项是一个 cartItem
    items: storage.get('cart') || []
  },

  getters: {
    // 购物车商品总数（所有条目数量之和）
    totalCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),

    // 选中商品
    selectedItems: state => state.items.filter(item => item.selected),

    // 选中商品总金额
    totalPrice: (state, getters) =>
      getters.selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),

    // 是否全选
    isAllSelected: state => state.items.length > 0 && state.items.every(item => item.selected),

    // 选中数量
    selectedCount: (state, getters) =>
      getters.selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  },

  mutations: {
    // 加入购物车（已有则 +1）
    ADD_ITEM(state, { product, selectedSpecs, quantity = 1 }) {
      const specKey = Object.values(selectedSpecs).join('_')
      const key = makeKey(product.id, specKey)
      const existing = state.items.find(item => item.key === key)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          specs: { ...selectedSpecs },
          quantity,
          selected: true
        })
      }
    },

    // 修改数量
    UPDATE_QUANTITY(state, { key, quantity }) {
      const item = state.items.find(i => i.key === key)
      if (item) item.quantity = Math.max(1, quantity)
    },

    // 删除单项
    REMOVE_ITEM(state, key) {
      state.items = state.items.filter(i => i.key !== key)
    },

    // 切换单项选中
    TOGGLE_SELECT(state, key) {
      const item = state.items.find(i => i.key === key)
      if (item) item.selected = !item.selected
    },

    // 全选 / 全不选
    TOGGLE_ALL(state, selected) {
      state.items.forEach(item => { item.selected = selected })
    },

    // 删除选中商品（结算后清空）
    REMOVE_SELECTED(state) {
      state.items = state.items.filter(item => !item.selected)
    },

    // 清空购物车
    CLEAR(state) {
      state.items = []
    }
  },

  actions: {
    addItem({ commit, dispatch }, payload) {
      commit('ADD_ITEM', payload)
      dispatch('persist')
    },
    updateQuantity({ commit, dispatch }, payload) {
      commit('UPDATE_QUANTITY', payload)
      dispatch('persist')
    },
    removeItem({ commit, dispatch }, key) {
      commit('REMOVE_ITEM', key)
      dispatch('persist')
    },
    toggleSelect({ commit, dispatch }, key) {
      commit('TOGGLE_SELECT', key)
      dispatch('persist')
    },
    toggleAll({ commit, dispatch }, selected) {
      commit('TOGGLE_ALL', selected)
      dispatch('persist')
    },
    removeSelected({ commit, dispatch }) {
      commit('REMOVE_SELECTED')
      dispatch('persist')
    },
    // 持久化到 localStorage
    persist({ state }) {
      storage.set('cart', state.items)
    }
  }
}
