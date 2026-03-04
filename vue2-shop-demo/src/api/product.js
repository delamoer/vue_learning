/**
 * 商品相关 API（使用 mock 数据模拟异步接口）
 */
import { getProductList, getProductById, getRecommended, getHotSales, categories } from '@/mock'

// 模拟网络延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const productApi = {
  /** 获取分类列表 */
  async getCategories() {
    await delay(100)
    return { data: categories }
  },

  /** 获取商品列表（支持筛选/排序/分页） */
  async getList(params) {
    await delay(300)
    return getProductList(params)
  },

  /** 获取商品详情 */
  async getDetail(id) {
    await delay(200)
    const data = getProductById(id)
    if (!data) return Promise.reject(new Error('商品不存在'))
    return { data }
  },

  /** 获取首页热销商品 */
  async getHotSales() {
    await delay(200)
    return { data: getHotSales() }
  },

  /** 获取首页推荐商品 */
  async getRecommended() {
    await delay(150)
    return { data: getRecommended() }
  }
}
