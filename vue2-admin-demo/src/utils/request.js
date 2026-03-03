/**
 * Axios 请求封装
 *
 * 知识点：
 * 1. 创建实例（baseURL / timeout / headers）
 * 2. 请求拦截器 → 自动注入 Token
 * 3. 响应拦截器 → 统一处理业务错误码、401 跳登录
 * 4. 导出 request 函数，业务代码调用 request({ url, method, data })
 */

import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, clearAuth } from '@/utils/auth'
import router from '@/router'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// ─── 请求拦截器 ─────────────────────────────────────────
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      // 将 token 注入 Authorization Header
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// ─── 响应拦截器 ─────────────────────────────────────────
service.interceptors.response.use(
  response => {
    const res = response.data

    // 约定：{ code: 0, data: ..., message: '' }
    // code !== 0  → 业务错误
    if (res.code !== 0) {
      Message.error(res.message || '请求出错')
      return Promise.reject(new Error(res.message || '请求出错'))
    }

    return res.data   // 直接返回 data 字段，业务代码无需再 .data.data
  },
  error => {
    const status = error.response?.status

    if (status === 401) {
      // Token 失效 → 清除登录状态，跳到登录页
      clearAuth()
      router.replace({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
      Message.error('登录已过期，请重新登录')
    } else if (status === 403) {
      Message.error('无权限访问')
      router.replace('/403')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务器错误，请稍后重试')
    } else {
      Message.error(error.message || '网络错误')
    }

    return Promise.reject(error)
  }
)

export default service
