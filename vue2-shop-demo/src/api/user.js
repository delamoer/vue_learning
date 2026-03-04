/**
 * 用户 / 订单相关 API
 */
import { mockLogin, mockAddresses } from '@/mock'

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const userApi = {
  /** 登录 */
  async login(username, password) {
    await delay(500)
    const result = mockLogin(username, password)
    if (!result.success) return Promise.reject(new Error(result.message))
    return result
  },

  /** 获取收货地址列表 */
  async getAddresses() {
    await delay(200)
    return { data: mockAddresses }
  }
}

export const orderApi = {
  /** 提交订单 */
  async submit(orderData) {
    await delay(800)
    // 模拟成功，返回订单号
    return {
      success: true,
      orderId: 'ORD' + Date.now(),
      message: '订单提交成功'
    }
  }
}
