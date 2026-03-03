/**
 * 文章管理接口
 */

import request from '@/utils/request'
import { delay, ok, MOCK_ARTICLES } from '@/mock/data'

const isMock = process.env.VUE_APP_ENABLE_MOCK === 'true'

let mockList = [...MOCK_ARTICLES]
let nextId = mockList.length + 1

export function getArticleList(params = {}) {
  if (isMock) {
    return delay(300).then(() => {
      let list = [...mockList]
      const { keyword, status, category, page = 1, pageSize = 10 } = params

      if (keyword) list = list.filter(a => a.title.includes(keyword) || a.summary.includes(keyword))
      if (status) list = list.filter(a => a.status === status)
      if (category) list = list.filter(a => a.category === category)

      const total = list.length
      const start = (page - 1) * pageSize
      return ok({ list: list.slice(start, start + pageSize), total, page, pageSize })
    })
  }
  return request({ url: '/api/articles', method: 'get', params })
}

export function getArticleDetail(id) {
  if (isMock) {
    return delay(200).then(() => {
      const item = mockList.find(a => a.id === id)
      return item ? ok({ ...item, content: `# ${item.title}\n\n${item.summary}\n\n这是文章正文内容示例...` }) : Promise.reject(new Error('文章不存在'))
    })
  }
  return request({ url: `/api/articles/${id}`, method: 'get' })
}

export function createArticle(data) {
  if (isMock) {
    return delay(400).then(() => {
      const item = {
        ...data,
        id: nextId++,
        views: 0,
        createTime: new Date().toLocaleString(),
        updateTime: new Date().toLocaleString()
      }
      mockList.unshift(item)
      return ok(item)
    })
  }
  return request({ url: '/api/articles', method: 'post', data })
}

export function updateArticle(id, data) {
  if (isMock) {
    return delay(400).then(() => {
      const idx = mockList.findIndex(a => a.id === id)
      if (idx === -1) return Promise.reject(new Error('文章不存在'))
      mockList[idx] = { ...mockList[idx], ...data, updateTime: new Date().toLocaleString() }
      return ok(mockList[idx])
    })
  }
  return request({ url: `/api/articles/${id}`, method: 'put', data })
}

export function deleteArticle(id) {
  if (isMock) {
    return delay(300).then(() => {
      mockList = mockList.filter(a => a.id !== id)
      return ok(null)
    })
  }
  return request({ url: `/api/articles/${id}`, method: 'delete' })
}
