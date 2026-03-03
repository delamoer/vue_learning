// store/index.js — 根 Store，注册所有模块
import Vue  from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  // 根级的 state（全局通用状态）
  state: {
    globalLoading: false,
    toast: { show: false, msg: '', type: 'success' }
  },

  mutations: {
    SET_GLOBAL_LOADING(state, v) { state.globalLoading = v },
    SHOW_TOAST(state, { msg, type = 'success' }) {
      state.toast = { show: true, msg, type }
    },
    HIDE_TOAST(state) {
      state.toast = { ...state.toast, show: false }
    }
  },

  actions: {
    showToast({ commit }, payload) {
      commit('SHOW_TOAST', payload)
      setTimeout(() => commit('HIDE_TOAST'), 3000)
    }
  },

  // 注册子模块
  modules: { user, cart },

  // 开发环境开启严格模式（防止直接修改 state）
  strict: process.env.NODE_ENV !== 'production',

  // 持久化插件：只持久化必要字段
  plugins: [
    createPersistedState({
      key:   'vue2-vuex-demo',
      paths: ['user.token', 'user.id', 'user.name', 'user.roles', 'cart.items']
    })
  ]
})
