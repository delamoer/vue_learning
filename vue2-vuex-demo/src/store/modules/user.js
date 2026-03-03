// store/modules/user.js — 用户状态模块（命名空间：user）
import * as types from '../mutation-types'

// 模拟 API（实际项目换成真实 axios 请求）
const fakeApi = {
  login({ username, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === '123456') {
          resolve({
            token: 'mock-token-admin-abc123',
            user:  { id: 1, name: '管理员', avatar: '', roles: ['admin', 'user'] }
          })
        } else if (username === 'user' && password === '123456') {
          resolve({
            token: 'mock-token-user-xyz789',
            user:  { id: 2, name: '普通用户', avatar: '', roles: ['user'] }
          })
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 800)
    })
  }
}

export default {
  namespaced: true,

  // state 用函数形式（防止模块实例间引用共享）
  state: () => ({
    id:       null,
    name:     '',
    avatar:   '',
    roles:    [],
    token:    '',       // token 持久化由 vuex-persistedstate 处理
    loading:  false,
    loginError: ''
  }),

  getters: {
    isLoggedIn:  state => !!state.id,
    isAdmin:     state => state.roles.includes('admin'),
    displayName: state => state.name || '未登录'
  },

  mutations: {
    [types.SET_USER](state, user) {
      state.id     = user.id
      state.name   = user.name
      state.avatar = user.avatar || ''
      state.roles  = user.roles  || []
    },
    [types.SET_TOKEN](state, token) {
      state.token = token
    },
    [types.CLEAR_AUTH](state) {
      state.id      = null
      state.name    = ''
      state.avatar  = ''
      state.roles   = []
      state.token   = ''
      state.loginError = ''
    },
    [types.SET_LOADING](state, loading) {
      state.loading = loading
    },
    SET_LOGIN_ERROR(state, msg) {
      state.loginError = msg
    }
  },

  actions: {
    // 登录
    async login({ commit }, credentials) {
      commit(types.SET_LOADING, true)
      commit('SET_LOGIN_ERROR', '')
      try {
        const { token, user } = await fakeApi.login(credentials)
        commit(types.SET_TOKEN, token)
        commit(types.SET_USER,  user)
      } catch (err) {
        commit('SET_LOGIN_ERROR', err.message)
        throw err
      } finally {
        commit(types.SET_LOADING, false)
      }
    },

    // 登出
    logout({ commit }) {
      commit(types.CLEAR_AUTH)
    }
  }
}
