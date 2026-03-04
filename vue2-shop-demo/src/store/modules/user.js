/**
 * Vuex 用户模块
 */
import { storage } from '@/utils/storage'

export default {
  namespaced: true,

  state: {
    token: storage.get('token') || '',
    userInfo: storage.get('userInfo') || null
  },

  getters: {
    isLoggedIn: state => !!state.token,
    nickname: state => state.userInfo?.nickname || '未登录'
  },

  mutations: {
    SET_TOKEN(state, token) { state.token = token },
    SET_USER_INFO(state, info) { state.userInfo = info },
    LOGOUT(state) { state.token = ''; state.userInfo = null }
  },

  actions: {
    login({ commit }, { token, userInfo }) {
      commit('SET_TOKEN', token)
      commit('SET_USER_INFO', userInfo)
      storage.set('token', token)
      storage.set('userInfo', userInfo)
    },
    logout({ commit }) {
      commit('LOGOUT')
      storage.remove('token')
      storage.remove('userInfo')
    }
  }
}
