/**
 * Vuex Store 入口
 *
 * 知识点：
 * - 模块化（modules）：auth / app / tagsView  各自独立
 * - namespaced: true → 调用时需加模块名前缀
 *
 * 调用示例：
 *   this.$store.getters['auth/isLoggedIn']
 *   this.$store.dispatch('auth/login', payload)
 *   this.$store.commit('app/TOGGLE_SIDEBAR')
 *
 * mapGetters 辅助：
 *   ...mapGetters('auth', ['isLoggedIn', 'userInfo'])
 */

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import app from './modules/app'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict 模式：开发环境开启，防止直接修改 state
  strict: process.env.NODE_ENV === 'development',

  modules: {
    auth,
    app,
    tagsView
  }
})
