/**
 * Vuex 模块：tagsView（多标签页/面包屑导航记录）
 *
 * 知识点：
 * - 通过 router.meta.title 获取页面标题
 * - 路由 fullPath 作为唯一键，防止重复
 * - 固定标签（affix:true）不可关闭
 */

const state = () => ({
  // 已访问的标签页列表
  visitedViews: [],
  // 缓存的组件名列表（配合 keep-alive 使用）
  cachedViews: []
})

const mutations = {
  ADD_VISITED_VIEW(state, view) {
    // 已存在则不重复添加
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push({
      name:     view.name,
      path:     view.path,
      fullPath: view.fullPath,
      title:    view.meta?.title || '无标题',
      affix:    !!view.meta?.affix   // 固定标签不可关闭
    })
  },

  ADD_CACHED_VIEW(state, view) {
    if (!view.name || state.cachedViews.includes(view.name)) return
    // 只缓存 keepAlive: true 的组件
    if (view.meta?.keepAlive) {
      state.cachedViews.push(view.name)
    }
  },

  DEL_VISITED_VIEW(state, view) {
    const idx = state.visitedViews.findIndex(v => v.path === view.path)
    if (idx > -1) state.visitedViews.splice(idx, 1)
  },

  DEL_CACHED_VIEW(state, view) {
    const idx = state.cachedViews.indexOf(view.name)
    if (idx > -1) state.cachedViews.splice(idx, 1)
  },

  DEL_OTHER_VISITED_VIEWS(state, view) {
    state.visitedViews = state.visitedViews.filter(v => v.affix || v.path === view.path)
  },

  DEL_ALL_VISITED_VIEWS(state) {
    // 保留固定标签
    state.visitedViews = state.visitedViews.filter(v => v.affix)
  },

  DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = []
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({ visitedViews: [...state.visitedViews] })
    })
  },
  delVisitedView({ commit }, view) { commit('DEL_VISITED_VIEW', view) },
  delCachedView({ commit }, view)  { commit('DEL_CACHED_VIEW', view) },
  delOtherViews({ dispatch }, view) {
    dispatch('delOtherVisitedViews', view)
    dispatch('delAllCachedViews')
  },
  delOtherVisitedViews({ commit }, view) { commit('DEL_OTHER_VISITED_VIEWS', view) },
  delAllViews({ dispatch }) {
    dispatch('delAllVisitedViews')
    dispatch('delAllCachedViews')
  },
  delAllVisitedViews({ commit }) { commit('DEL_ALL_VISITED_VIEWS') },
  delAllCachedViews({ commit })  { commit('DEL_ALL_CACHED_VIEWS') }
}

const getters = {
  visitedViews: state => state.visitedViews,
  cachedViews:  state => state.cachedViews
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
