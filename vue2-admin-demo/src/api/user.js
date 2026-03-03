/**
 * 用户管理接口
 * 知识点：分页参数构造、CRUD 规范（GET/POST/PUT/DELETE）
 */

import request from '@/utils/request'
import { delay, ok, MOCK_USERS } from '@/mock/data'

const isMock = process.env.VUE_APP_ENABLE_MOCK === 'true'

// 在内存中维护 mock 用户列表（支持增删改查）
let mockUserList = [...MOCK_USERS]
let nextId = mockUserList.length + 1

/**
 * 获取用户列表（分页 + 搜索）
 * @param {Object} params { page, pageSize, keyword, role, status }
 */
export function getUserList(params = {}) {
  if (isMock) {
    return delay(300).then(() => {
      let list = [...mockUserList]
      const { keyword, role, status, page = 1, pageSize = 10 } = params

      if (keyword) {
        list = list.filter(u =>
          u.name.includes(keyword) || u.username.includes(keyword) || u.email.includes(keyword)
        )
      }
      if (role) list = list.filter(u => u.roles.includes(role))
      if (status !== undefined && status !== '') {
        list = list.filter(u => u.status === Number(status))
      }

      const total = list.length
      const start = (page - 1) * pageSize
      return ok({ list: list.slice(start, start + pageSize), total, page, pageSize })
    })
  }
  return request({ url: '/api/users', method: 'get', params })
}

/**
 * 获取单个用户详情
 */
export function getUserDetail(id) {
  if (isMock) {
    return delay(200).then(() => {
      const user = mockUserList.find(u => u.id === id)
      return user ? ok(user) : Promise.reject(new Error('用户不存在'))
    })
  }
  return request({ url: `/api/users/${id}`, method: 'get' })
}

/**
 * 新建用户
 */
export function createUser(data) {
  if (isMock) {
    return delay(400).then(() => {
      const exists = mockUserList.find(u => u.username === data.username)
      if (exists) return Promise.reject(new Error('用户名已存在'))
      const user = { ...data, id: nextId++, createTime: new Date().toLocaleString() }
      mockUserList.push(user)
      return ok(user)
    })
  }
  return request({ url: '/api/users', method: 'post', data })
}

/**
 * 更新用户
 */
export function updateUser(id, data) {
  if (isMock) {
    return delay(400).then(() => {
      const idx = mockUserList.findIndex(u => u.id === id)
      if (idx === -1) return Promise.reject(new Error('用户不存在'))
      mockUserList[idx] = { ...mockUserList[idx], ...data }
      return ok(mockUserList[idx])
    })
  }
  return request({ url: `/api/users/${id}`, method: 'put', data })
}

/**
 * 删除用户
 */
export function deleteUser(id) {
  if (isMock) {
    return delay(300).then(() => {
      mockUserList = mockUserList.filter(u => u.id !== id)
      return ok(null)
    })
  }
  return request({ url: `/api/users/${id}`, method: 'delete' })
}

/**
 * 修改用户状态（启用/禁用）
 */
export function updateUserStatus(id, status) {
  return updateUser(id, { status })
}
