/**
 * Vuex 模块：auth（认证与权限）
 *
 * 知识点：
 * - namespaced: true → 模块命名空间
 * - state：存储 token / userInfo / roles
 * - mutations：同步修改 state
 * - actions：异步操作（调用 API）
 * - getters：派生数据（计算属性）
 *
 * 访问方式：
 *   store.getters['auth/isLoggedIn']
 *   store.dispatch('auth/login', { username, password })
 *   this.$store.commit('auth/SET_TOKEN', token)
 */

import { login as apiLogin, getUserProfile, logout as apiLogout } from '@/api/auth'
import { getToken, setToken, setUserInfo, clearAuth } from '@/utils/auth'

const state = () => ({
  token:    getToken() || '',      // 从 localStorage 初始化
  userInfo: null,                  // 当前登录用户信息
  roles:    []                     // 当前用户角色列表
})

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER_INFO(state, info) {
    state.userInfo = info
    state.roles = info?.roles || []
  },
  CLEAR_AUTH(state) {
    state.token = ''
    state.userInfo = null
    state.roles = []
  }
}

const actions = {
  /**
   * 登录 Action
   * 流程：调用登录 API → 保存 token → 保存用户信息到 store 和 localStorage
   */
  async login({ commit }, { username, password }) {
    const data = await apiLogin(username, password)
    commit('SET_TOKEN', data.token)
    commit('SET_USER_INFO', data.user)
    setToken(data.token)
    setUserInfo(data.user)
    return data
  },

  /**
   * 获取用户信息
   * 页面刷新后 roles 丢失，需要重新请求（token 还在 localStorage）
   */
  async fetchUserInfo({ commit }) {
    const user = await getUserProfile()
    commit('SET_USER_INFO', user)
    return user
  },

  /**
   * 登出 Action
   * 流程：调用登出 API（通知服务端使 token 失效）→ 清除本地状态
   */
  async logout({ commit }) {
    try {
      await apiLogout()
    } catch {
      // 即使接口失败，也要清除本地状态
    }
    commit('CLEAR_AUTH')
    clearAuth()
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  userInfo:   state => state.userInfo,
  roles:      state => state.roles,
  userName:   state => state.userInfo?.name || '',
  userAvatar: state => state.userInfo?.avatar || '',

  // 权限判断：当前用户是否具备指定角色之一
  hasRole: state => (...roles) => state.roles.some(r => roles.includes(r)),
  isSuperAdmin: state => state.roles.includes('superAdmin')
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
