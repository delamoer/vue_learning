/**
 * 认证接口：登录 / 获取用户信息 / 登出
 *
 * 知识点：
 * - Mock 与真实接口切换（VUE_APP_ENABLE_MOCK）
 * - 登录后 token 的处理流程
 */

import request from '@/utils/request'
import { delay, ok, MOCK_USERS, MOCK_ACCOUNTS, genToken } from '@/mock/data'

const isMock = process.env.VUE_APP_ENABLE_MOCK === 'true'

/**
 * 登录
 * @param {string} username
 * @param {string} password
 */
export function login(username, password) {
  if (isMock) {
    return delay(400).then(() => {
      const user = MOCK_USERS.find(u => u.username === username)
      if (!user) return Promise.reject(new Error('用户不存在'))
      if (MOCK_ACCOUNTS[username] !== password) return Promise.reject(new Error('密码错误'))
      if (user.status === 0) return Promise.reject(new Error('账号已禁用'))
      return ok({ token: genToken(username), user })
    })
  }
  return request({ url: '/api/auth/login', method: 'post', data: { username, password } })
}

/**
 * 获取当前用户信息（通过 token）
 */
export function getUserProfile() {
  if (isMock) {
    // mock 模式：从 localStorage 取已登录用户
    const { getUserInfo } = require('@/utils/auth')
    const user = getUserInfo()
    return delay(200).then(() => ok(user))
  }
  return request({ url: '/api/auth/profile', method: 'get' })
}

/**
 * 登出
 */
export function logout() {
  if (isMock) {
    return delay(200).then(() => ok(null))
  }
  return request({ url: '/api/auth/logout', method: 'post' })
}
