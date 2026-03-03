/**
 * Vuex 模块：app（应用全局状态）
 *
 * 知识点：
 * - 侧边栏折叠状态持久化（localStorage）
 * - 移动端时自动折叠
 */

const SIDEBAR_KEY = 'vue_admin_sidebar_opened'

const state = () => ({
  // 侧边栏是否展开（从 localStorage 恢复，默认展开）
  sidebarOpened: localStorage.getItem(SIDEBAR_KEY) !== 'false',
  // 页面加载进度条
  loading: false,
  // 设备类型
  device: 'desktop'  // desktop | mobile
})

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebarOpened = !state.sidebarOpened
    localStorage.setItem(SIDEBAR_KEY, state.sidebarOpened)
  },
  CLOSE_SIDEBAR(state) {
    state.sidebarOpened = false
    localStorage.setItem(SIDEBAR_KEY, 'false')
  },
  SET_DEVICE(state, device) {
    state.device = device
  },
  SET_LOADING(state, val) {
    state.loading = val
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  setDevice({ commit }, device) {
    commit('SET_DEVICE', device)
  }
}

const getters = {
  sidebarOpened: state => state.sidebarOpened,
  isMobile: state => state.device === 'mobile'
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
