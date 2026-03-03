/**
 * 仪表盘数据接口
 */

import request from '@/utils/request'
import { delay, ok, MOCK_STATS, MOCK_CHART_DATA } from '@/mock/data'

const isMock = process.env.VUE_APP_ENABLE_MOCK === 'true'

export function getDashboardStats() {
  if (isMock) {
    return delay(300).then(() => ok(MOCK_STATS))
  }
  return request({ url: '/api/dashboard/stats', method: 'get' })
}

export function getChartData() {
  if (isMock) {
    return delay(300).then(() => ok(MOCK_CHART_DATA))
  }
  return request({ url: '/api/dashboard/chart', method: 'get' })
}
