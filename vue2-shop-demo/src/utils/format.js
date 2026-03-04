/**
 * 格式化工具函数
 */

/** 格式化价格 ¥5,999.00 */
export function formatPrice(price) {
  return '¥' + Number(price).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/** 格式化销量 12800 → 1.28万 */
export function formatSales(num) {
  if (num >= 10000) return (num / 10000).toFixed(1) + '万'
  return String(num)
}

/** 格式化日期 */
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm') {
  const d = new Date(date)
  const map = {
    YYYY: d.getFullYear(),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    DD: String(d.getDate()).padStart(2, '0'),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0')
  }
  return fmt.replace(/YYYY|MM|DD|HH|mm/g, k => map[k])
}

/** 生成随机订单号 */
export function generateOrderNo() {
  const now = new Date()
  const dateStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0')
  ].join('')
  return dateStr + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
}
