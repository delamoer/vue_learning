// Token 的存取封装（localStorage）
// 项目中所有 token 操作必须通过此模块，便于统一修改存储方式

const TOKEN_KEY = 'vue_admin_token'
const USER_INFO_KEY = 'vue_admin_user'

// --------------- token ---------------
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_KEY)
}

// --------------- 用户信息 ---------------
export function getUserInfo() {
  try {
    const raw = localStorage.getItem(USER_INFO_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setUserInfo(info) {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(info))
}

export function removeUserInfo() {
  localStorage.removeItem(USER_INFO_KEY)
}

// --------------- 清除全部登录状态 ---------------
export function clearAuth() {
  removeToken()
  removeUserInfo()
}
